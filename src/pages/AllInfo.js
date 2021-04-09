import React, { useEffect, useState } from "react";
import "../css/AllInfo.css";

function AllInfo() {
  const [countries, setCountries] = useState([]);
  const [counter, setCounter] = useState("country");

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          setCountries(data);
        });
    };
    getCountriesData();
  }, []);

  useEffect(() => {
    const sortData = (data) => {
      const sortedData = [...data];
      console.log(counter, data);
      if (counter === "country") {
        sortedData.sort((a, b) => (a.country > b.country ? 1 : -1));
      }
      if (counter === "deaths") {
        sortedData.sort((a, b) => (a.deaths > b.deaths ? -1 : 1));
      }
      if (counter === "recovered") {
        sortedData.sort((a, b) => (a.recovered > b.recovered ? -1 : 1));
      }
      if (counter === "cases") {
        sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));
      }
      setCountries(sortedData);
    };
    sortData(countries);
  }, [counter]);

  return (
    <>
      <div className="list_container">
        <ul className="table_headers">
          <li
            key="country"
            onClick={() => {
              setCounter("country");
            }}
          >
            Country
          </li>
          <li
            key="cases"
            onClick={() => {
              setCounter("cases");
            }}
          >
            Total Cases
          </li>
          <li
            key="recovered"
            onClick={() => {
              setCounter("recovered");
            }}
          >
            Recovered
          </li>
          <li
            key="deaths"
            onClick={() => {
              setCounter("deaths");
            }}
          >
            Deaths
          </li>
        </ul>
        <ul className="table">
          {countries.map(
            ({ country, cases, recovered, deaths, countryInfo }) => (
              <li key={countryInfo.id}>
                <span
                  className="table_flag"
                  style={{
                    background: `url(${countryInfo.flag})center/ cover no-repeat `,
                  }}
                >
                  {country}
                </span>
                <span className="table_data">{cases}</span>
                <span className="table_data">{recovered}</span>
                <span className="table_data">{deaths}</span>
              </li>
            )
          )}
        </ul>
      </div>
    </>
  );
}

export default AllInfo;
