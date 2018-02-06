require('babel-polyfill');
const rp = require('request-promise');
const nodeGeocoder = require('node-geocoder');
const optionsGeocode = {
	provider: 'google',
	httpAdapter: 'https',
	apiKey: process.env.GOOGLE_API,
	formatter: null
};
const geocoder = nodeGeocoder(optionsGeocode);

exports.coordinates = async function(location) {
	try {
		const getCoords = await geocoder.geocode(location)
		const coords = {
			latitude: res[0].latitude,
			longitude: res[0].longitude
		}
		return coords
	} catch(e) {
		throw Error(e)
	}
}
