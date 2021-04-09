import React from "react";
import { MapContainer as LeafletMap, TileLayer } from "react-leaflet";
import "../css/Map.css";
import { showDataOnMap } from "./util";

function Map({ countries, casesTypes, center, zoom }) {
  return (
    <div className="map">
      <LeafletMap center={center} zoom={zoom}>
        <TileLayer
          attribution=' &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {showDataOnMap(countries, casesTypes)}
      </LeafletMap>
    </div>
  );
}

export default Map;
