import { Circle, Popup } from "react-leaflet";
import numeral from "numeral";
import "../css/Map.css";

const casesTypesColors = {
  cases: {
    hex: "#CC1034",
    multiplier: 500,
  },
  recovered: {
    hex: "#7dd71d",
    multiplier: 500,
  },
  deaths: {
    hex: "#fb4433",
    multiplier: 1000,
  },
};
export const showDataOnMap = (countries, caseTypes) =>
  countries.map((country) => (
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      fillOpacity={0.4}
      color={casesTypesColors[caseTypes].hex}
      fillColor={casesTypesColors[caseTypes].hex}
      radius={
        Math.sqrt(country[caseTypes]) * casesTypesColors[caseTypes].multiplier
      }
    >
      <Popup>
        <div className="info-container">
          <div
            className="info-flag"
            style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
          ></div>
          <div className="info-name">{country.country}</div>
          <div className="info-cases">
            Cases : {numeral(country.cases).format("0,0")}{" "}
          </div>
          <div className="info-recovered">
            Recovered : {numeral(country.recovered).format("0,0")}
          </div>
          <div className="info-deaths">
            Deaths : {numeral(country.deaths).format("0,0")}
          </div>
        </div>
      </Popup>
    </Circle>
  ));

export const sortData = (data) => {
  const sortedData = [...data];
  return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));
};

export default casesTypesColors;
