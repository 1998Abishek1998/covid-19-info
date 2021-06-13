/** @format */

import React, { useState, useContext } from "react"
import InfoBox from "../components/InfoBox"
import Map from "../components/Map"
import "leaflet/dist/leaflet.css"
import LineGraph from "../components/LineGraph"
import { FormControl, MenuItem, Select } from "@material-ui/core"
import { Link } from "react-router-dom"
import { CovidContext } from "../context"

function Home() {
	const context = useContext(CovidContext)
	const { allCountry, countryInfo } = context
	const [mapCenter, setMapCenter] = useState([37.80746, -10.4796])
	const [mapZoom, setMapZoom] = useState(1.5)
	const [caseTypes, setCasesTypes] = useState("cases")

	return (
		<div className="homepage">
			<div className="infoBox__home">
				<InfoBox
					key="Case12321"
					onClick={() => {
						setCasesTypes("cases")
					}}
					title="Cases"
					total={allCountry.cases}
					cases={allCountry.todayCases}
					caseType="cases"
				/>
				<InfoBox
					key="Reco2312ver"
					onClick={() => setCasesTypes("recovered")}
					title="Recovered"
					total={allCountry.recovered}
					cases={allCountry.todayRecovered}
					caseType="recovered"
				/>
				<InfoBox
					key="Dea312312th"
					onClick={() => setCasesTypes("deaths")}
					title="Deaths"
					total={allCountry.deaths}
					cases={allCountry.todayDeaths}
					caseType="deaths"
				/>
				<FormControl className="homepage__dropdown">
					<Select
						varient="outlined"
						className="homepage__dropdown"
						value="worldwide"
						key={-4565}>
						<MenuItem value="worldwide" className="homepage__dropdown">
							Worldwide
						</MenuItem>
						{countryInfo.map((country) => (
							<Link
								key={country.id}
								className="homepage__link"
								to={`/singleCountry/${country.name}`}>
								<MenuItem value={country.value}>{country.name}</MenuItem>
							</Link>
						))}
					</Select>
				</FormControl>
			</div>
			<div className="homepage__design">
				<Map
					key="4sdas568123123"
					countries={countryInfo}
					caseTypes={caseTypes}
					center={mapCenter}
					zoom={mapZoom}
					alt="maps"
				/>
				<LineGraph key={caseTypes} caseType={caseTypes} />
			</div>
		</div>
	)
}

export default Home
