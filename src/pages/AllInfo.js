/** @format */

import numeral from "numeral"
import React, { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { CovidContext } from "../context"
function AllInfo() {
	const context = useContext(CovidContext)
	const { countryInfo } = context
	const [country, setcountry] = useState([...countryInfo])
	const [counter, setCounter] = useState("country")

	useEffect(() => {
		const sortData = (data) => {
			const sortedData = [...data]
			if (counter === "country") {
				sortedData.sort((a, b) => (a.name > b.name ? 1 : -1))
			}
			if (counter === "deaths") {
				sortedData.sort((a, b) => (a.deaths > b.deaths ? -1 : 1))
			}
			if (counter === "recovered") {
				sortedData.sort((a, b) => (a.recovered > b.recovered ? -1 : 1))
			}
			if (counter === "cases") {
				sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1))
			}
			setcountry(sortedData)
		}
		sortData(countryInfo)
	}, [counter])

	return (
		<>
			<div className="list">
				<div className="list__container">
					<ul className="list__headers">
						<li
							onClick={() => {
								setCounter("country")
							}}>
							Country
						</li>
						<li
							onClick={() => {
								setCounter("cases")
							}}>
							Total Cases
						</li>
						<li
							onClick={() => {
								setCounter("recovered")
							}}>
							Recovered
						</li>
						<li
							onClick={() => {
								setCounter("deaths")
							}}>
							Deaths
						</li>
					</ul>
					<ul className="list__table">
						{country.map((country) => {
							if (country.name !== "Diamond Princess") {
								return (
									<Link
										to={`/singleCountry/${country.name}`}
										key={country.flag}
										className="list__link">
										<li className="list__container">
											<span className="list__countryName">
												{country.name}

												<img src={`${country.flag}`} className="list__flag" />
												{/* <span
												className="list__flag"
												style={{
													background: `url(${country.flag})center/ cover no-repeat`,
												}}>
												{country.name}
											</span> */}
											</span>
											<span className="list__data">
												{numeral(country.cases).format("0,0")}
											</span>
											<span className="list__data">
												{numeral(country.recovered).format("0,0")}
											</span>
											<span className="list__data">
												{numeral(country.deaths).format("0,0")}
											</span>
										</li>
									</Link>
								)
							}
						})}
					</ul>
				</div>
			</div>
		</>
	)
}

export default AllInfo
