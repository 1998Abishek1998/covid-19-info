/** @format */

import React from "react"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import AllInfo from "./pages/AllInfo"
import Error from "./pages/Error"

import { Route, Switch } from "react-router-dom"
import { SingleCountry } from "./pages/SingleCountry"

function App() {
	return (
		<>
			<Navbar></Navbar>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/AllInfo" component={AllInfo} />
				<Route exact path="/SingleCountry/:name" component={SingleCountry} />
				<Route component={Error} />
			</Switch>
		</>
	)
}

export default App
