/** @format */

import React, { Component } from "react"

const CovidContext = React.createContext()
class CovidProvider extends Component {
	state = {
		allCountry: [],
		countryInfo: [],
	}

	async componentDidMount() {
		let allCountry = await fetch("https://disease.sh/v3/covid-19/all")
			.then((response) => response.json())
			.then((data) => {
				return data
			})
		await fetch("https://disease.sh/v3/covid-19/countries")
			.then((response) => response.json())
			.then((data) => {
				const countries = data.map((country) => ({
					name: country.country,
					value: country.countryInfo.iso2,
					id: country.countryInfo._id,
					lat: country.countryInfo.lat,
					long: country.countryInfo.long,
					flag: country.countryInfo.flag,
					cases: country.cases,
					todayCases: country.todayCases,
					recovered: country.recovered,
					todayRecovered: country.todayRecovered,
					deaths: country.deaths,
					todayDeaths: country.todayDeaths,
					population: country.population,
					tests: country.tests,
				}))
				this.setState({
					countryInfo: countries,
				})
			})
		this.setState({
			allCountry,
		})
	}
	getSlug = (name) => {
		let tempCountry = [...this.state.countryInfo]
		const country = tempCountry.find((country) => country.name === name)
		return country
	}
	render() {
		return (
			<CovidContext.Provider value={{ ...this.state, getSlug: this.getSlug }}>
				{this.props.children}
			</CovidContext.Provider>
		)
	}
}

export { CovidProvider, CovidContext }
