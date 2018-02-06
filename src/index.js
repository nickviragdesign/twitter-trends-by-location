require('babel-polyfill');
const rp = require('request-promise');
const nodeGeocoder = require('node-geocoder');
const geocoder = nodeGeocoder(optionsGeocode);
const optionsGeocode = {
	provider: 'google',
	httpAdapter: 'https',
	apiKey: process.env.GOOGLE_API,
	formatter: null
};

exports.coordinates = location => {
	return geocoder.geocode(location, (err, res) => {
		res.latLon = {
			latitude: res[0].latitude,
			longitude: res[0].longitude
		};
		return res.latLon;
	});
}
