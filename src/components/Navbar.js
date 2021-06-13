/** @format */

import React from "react"
import FavoriteIcon from "@material-ui/icons/Favorite"
import { Link } from "react-router-dom"

function Navbar() {
	return (
		<nav className="navbar">
			<div className="navbar__container">
				<div className="navbar__title">
					<h1>Covid-19 InFo</h1>

					<h5>By Abishek Timsina</h5>
					<span>
						Created with
						<FavoriteIcon className="navbar__heartIcon" />
						from
						<Link to="/SingleCountry/Nepal">
							<img
								src="https://www.countryflags.io/np/shiny/64.png"
								height="20px"
							/>
						</Link>
					</span>
				</div>
				<div className="navbar__routing">
					<Link className="navbar__link" to="/">
						<h4>All cases</h4>
					</Link>
					<Link to="/AllInfo" className="navbar__link">
						<h4>List-Info</h4>
					</Link>
				</div>
			</div>
		</nav>
	)
}

export default Navbar
