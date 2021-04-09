import React, { useEffect, useState } from "react";
import InfoBox from "../components/InfoBox";
import "../css/Home.css";
import Map from "../components/Map";
import "leaflet/dist/leaflet.css";
import LineGraph from "../components/LineGraph";
import { FormControl, MenuItem, Select } from "@material-ui/core";

function Home() {
  const [countryInfo, setCountryInfo] = useState([]);
  const [mapCenter, setMapCenter] = useState([34.80746, -40.4796]);
  const [mapZoom, setMapZoom] = useState([1.5]);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesTypes, setCasesTypes] = useState("cases");
  const [countries, setCountries] = useState([]);
  const [worldwide, setWorldwide] = useState(["worldwide"]);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
            id: country.countryInfo._id,
          }));
          setCountries(countries);
          setMapCountries(data);
        });
    };
    getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    let url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    if (countryCode === "worldwide") {
      url = "https://disease.sh/v3/covid-19/all";
      await fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setWorldwide("worldwide");
          setMapZoom(2);
          setMapCenter([34.80746, -40.4796]);
          setCountryInfo(data);
        });
    } else {
      url = `https://disease.sh/v3/covid-19/countries/${countryCode}`;
      await fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setWorldwide(countryCode);
          setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
          setMapZoom(5);
          setCountryInfo(data);
        });
    }
  };

  return (
    <div className="homepage">
      <div className="homepage_infoBox">
        <InfoBox
          key="Case"
          onClick={() => {
            setCasesTypes("cases");
            console.log(casesTypes);
          }}
          title="Coronavirus Cases"
          total={countryInfo.cases}
          cases={countryInfo.todayCases}
        />
        <InfoBox
          key="Recover"
          onClick={() => setCasesTypes("recovered")}
          title="Recovered"
          total={countryInfo.recovered}
          cases={countryInfo.todayRecovered}
        />
        <InfoBox
          key="Death"
          onClick={() => setCasesTypes("deaths")}
          title="Deaths"
          total={countryInfo.deaths}
          cases={countryInfo.todayDeaths}
        />
        <FormControl className="homepage_dropdown">
          <Select
            varient="outlined"
            onClick={onCountryChange}
            value={worldwide}
            key={worldwide}
          >
            <MenuItem key={countryInfo} value="worldwide">
              Worldwide
            </MenuItem>
            {countries.map((country) => (
              <MenuItem key={country.value} value={country.value}>
                {country.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className="homepage_design">
        <Map
          countries={mapCountries}
          casesTypes={casesTypes}
          center={mapCenter}
          zoom={mapZoom}
          key={mapCenter}
        />
        <LineGraph key={casesTypes} casesType={casesTypes} />
      </div>
    </div>
  );
}

export default Home;
