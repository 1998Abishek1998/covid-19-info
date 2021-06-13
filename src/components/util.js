/** @format */

const casesTypesColors = {
	cases: {
		hex: "#CC1034",
		multiplier: 500,
	},
	recovered: {
		hex: "#7dd71d",
		multiplier: 500,
	},
	deaths: {
		hex: "#fb4433",
		multiplier: 1000,
	},
}
export const sortData = (data) => {
	const sortedData = [...data]
	return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1))
}

export default casesTypesColors
