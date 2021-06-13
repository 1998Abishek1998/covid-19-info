/** @format */

import React, { useEffect, useState } from "react"
import { Line } from "react-chartjs-2"
import numeral from "numeral"
import casesTypesColors from "./util"

const options = {
	legend: {
		display: false,
	},
	elements: {
		point: {
			radius: 0,
		},
	},
	maintainaspectRatio: false,
	tooltips: {
		mode: "index",
		intersect: false,
		callbacks: {
			label: function (tooltipItem, data) {
				return numeral(tooltipItem.value).format("+0,0")
			},
		},
	},
	scales: {
		xAxes: [
			{
				type: "time",
				time: {
					format: "MM/DD/YY",
					tooltipFormat: "ll",
				},
			},
		],
		yAxes: [
			{
				gridLines: {
					display: false,
				},
				ticks: {
					//include dollar sign in the ticks
					callback: function (value, index, values) {
						return numeral(value).format("0a")
					},
				},
			},
		],
	},
}

function LineGraph({ caseType }) {
	const [data, setData] = useState({})

	const buildChartData = (data, casesType) => {
		const chartData = []
		let lastDataPoint
		for (let date in data.cases) {
			if (lastDataPoint) {
				const newDataPoint = {
					x: date,
					y: data[casesType][date] - lastDataPoint,
				}
				chartData.push(newDataPoint)
			}
			lastDataPoint = data[casesType][date]
		}
		return chartData
	}

	useEffect(() => {
		const fetchData = async () => {
			await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
				.then((response) => response.json())
				.then((data) => {
					const chartData = buildChartData(data, caseType)
					setData(chartData)
				})
		}
		fetchData()
	}, [])

	return (
		<div className="linegraph">
			<h1>Worldwide {caseType} </h1>
			{data?.length > 0 && (
				<Line
					className="linegraph__actual"
					options={options}
					data={{
						datasets: [
							{
								data: data,
								backgroundColor: casesTypesColors[caseType].hex,
								borderColor: casesTypesColors[caseType].hex,
							},
						],
					}}
				/>
			)}
		</div>
	)
}

export default LineGraph
