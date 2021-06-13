/** @format */

import React from "react"
import {
	MapContainer as LeafletMap,
	TileLayer,
	Circle,
	Popup,
} from "react-leaflet"
import numeral from "numeral"
import casesTypesColors from "./util"

function Map({ countries, caseTypes, center, zoom }) {
	return (
		<div className="map">
			<LeafletMap center={center} zoom={zoom} scrollWheelZoom={false}>
				<TileLayer
					attribution=' &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				{countries.map((country) => (
					<Circle
						key={country.id * Math.random()}
						center={[country.lat, country.long]}
						fillOpacity={0.4}
						color={casesTypesColors[caseTypes].hex}
						fillColor={casesTypesColors[caseTypes].hex}
						radius={
							Math.sqrt(country[caseTypes]) *
							casesTypesColors[caseTypes].multiplier
						}>
						<Popup position={[country.lat, country.long]}>
							<div className="info__container">
								<div
									className="info__flag"
									style={{
										backgroundImage: `url(${country.flag})`,
									}}></div>
								<div className="info__name">{country.country}</div>
								<div className="info__desc">
									Cases : {numeral(country.cases).format("0,0")}
								</div>
								<div className="info__desc">
									Recovered : {numeral(country.recovered).format("0,0")}
								</div>
								<div className="info__desc">
									Deaths : {numeral(country.deaths).format("0,0")}
								</div>
							</div>
						</Popup>
					</Circle>
				))}
			</LeafletMap>
		</div>
	)
}

export default Map
