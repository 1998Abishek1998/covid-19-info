/** @format */

// /** @format */

import {
	MapContainer as LeafletMap,
	TileLayer,
	Circle,
	Popup,
} from "react-leaflet"
import numeral from "numeral"
import casesTypesColors from "../components/util"
import { CovidContext } from "../context"
import React, { useContext, useState } from "react"
import InfoBox from "../components/InfoBox"
import { FormControl, MenuItem, Select } from "@material-ui/core"
import { Link } from "react-router-dom"

export const SingleCountry = ({ ...props }) => {
	let nameCountry = props.match.params.name

	const { getSlug, countryInfo } = useContext(CovidContext)
	const country = getSlug(nameCountry)
	const [caseTypes, setCasesTypes] = useState("cases")
	const mapZoom = 5
	return (
		<div className="singleCountry">
			<div className="singleCountry__container">
				<div className="singleCountry__map">
					<LeafletMap
						key={country.long}
						center={[country.lat, country.long]}
						scrollWheelZoom={false}
						zoom={mapZoom}>
						<TileLayer
							attribution=' &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
							url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						/>
						<Circle
							key={country.id * Math.random() + 5 * Math.random()}
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
					</LeafletMap>
				</div>
				<div className="singleCountry__infoContainer">
					<div className="singleCountry__info">
						<div className="singleCountry__img">
							<img src={country.flag} alt="flag" />
						</div>
						<div className="singleCountry__name">
							<FormControl className="homepage__dropdown">
								<Select
									varient="outlined"
									value={country.name}
									key={-4564324235}>
									<MenuItem value={country.name}>{country.name}</MenuItem>
									{countryInfo.map((country) => (
										<Link
											onclick={() => {
												console.log(country)
											}}
											key={country.id * 1893684129}
											className="homepage__link"
											to={`/singleCountry/${country.name}`}>
											<MenuItem value={country.name} name={country.name}>
												{country.name}
											</MenuItem>
										</Link>
									))}
								</Select>
							</FormControl>
							<div className="singleCountry__countryInfo">
								<h2>{country.name}</h2>
								<h4>
									Country Population :{" "}
									{numeral(country.population).format("0,0")}
								</h4>
								<h4> Tests Done : {numeral(country.tests).format("0,0")}</h4>
							</div>
						</div>
					</div>
					<div className="singleCountry__infoBoxContainer">
						<div className="singleCountry__infoBox">
							<InfoBox
								key="Caseasdsssa12321"
								onClick={() => {
									setCasesTypes("cases")
								}}
								title="Cases"
								total={country.cases}
								cases={country.todayCases}
								caseType="cases"
							/>
							<InfoBox
								key="Reco23asdsa12ver"
								onClick={() => setCasesTypes("recovered")}
								title="Recovered"
								total={country.recovered}
								cases={country.todayRecovered}
								caseType="recovered"
							/>
							<InfoBox
								key="Dea312sdf312th"
								onClick={() => setCasesTypes("deaths")}
								title="Deaths"
								total={country.deaths}
								cases={country.todayDeaths}
								caseType="deaths"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
