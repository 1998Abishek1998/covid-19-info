/** @format */

import numeral from "numeral"
import React from "react"
function InfoBox({ title, cases, total, ...props }) {
	return (
		<div className="infoBox" onClick={props.onClick}>
			<span className="infoBox__title">{title}</span>
			{cases > 0 ? (
				<span className="infoBox__cases">
					Today : {numeral(cases).format("0,0")}
				</span>
			) : (
				<span className="infoBox__cases">No today's Data</span>
			)}
			<span className="infoBox__total">
				Total : {numeral(total).format("0,0")}
			</span>
		</div>
	)
}

export default InfoBox
