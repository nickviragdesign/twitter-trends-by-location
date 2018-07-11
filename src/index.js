require('babel-polyfill')

const rp = require('request-promise')
const nodeGeocoder = require('node-geocoder')
const optionsGeocode = {
	provider: 'google',
	httpAdapter: 'https',
	apiKey: process.env.GOOGLE_API,
	formatter: null
}
const geocoder = nodeGeocoder(optionsGeocode)

exports.coordinates = async location => {
	try {
		const getCoords = await geocoder.geocode(location)
		const coords = {
			latitude: getCoords[0].latitude,
			longitude: getCoords[0].longitude
		}
		return coords
	} catch(e) {
		throw e
	}
}

exports.closestAreaWithTrends = (latitude, longitude) => {
	const optionsWoeid = {
		url: `https://api.twitter.com/1.1/trends/closest.json?lat=${latitude}&long=${longitude}`,
		headers: {
			'Authorization': process.env.TWITTER_BEARER,
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*',
			'mode': 'cors'}
	}

	return rp.get(optionsWoeid, (error, response, body) => {
		if (error) {
			throw error
		} else {
			return JSON.parse(response.body)[0]
		}
	})
}

//
// Left Off
//

exports.getTrendingTopics = closestTrending => {

    const woeid = JSON.parse(closestTrending)[0].woeid
    const topicsURL = 'https://api.twitter.com/1.1/trends/place.json?id=' + woeid

    const optionsTopics = {
        url: topicsURL,
        headers: {
            'Authorization': process.env.TWITTER_BEARER,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'mode': 'cors'}
    }

    return rp.get(optionsTopics, (error, response, body) => {
        if (error) {
            throw error
        } else {
            return response.body
        }
    })
}
