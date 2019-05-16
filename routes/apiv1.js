
/*eslint-disable no-else-return */
var express = require('express');
var router = express.Router();
var REQUEST = require('request');

var request = REQUEST.defaults( {
    strictSSL: false
});

var OPENWEATHERURL = "http://api.openweathermap.org/data/2.5/weather?appid=6b7b471967dd0851d0010cdecf28f829&units=metric";//units are now metric
/*
exports.getWeather = function(req, res) {
	var zip = req.query.zip;
	if( (zip === null) || (typeof(zip) === 'undefined') ) {
		return res.status(400).send('zip missing');
	}
	

	var aurl = OPENWEATHERURL + '&zip=' + zip + ',us';
	request({
		method: 'GET',
        url: aurl,
  		json: true
    }, function(err, resp, body) {
    	if(err) {
    		res.status(400).send('Failed to get the data');
    		//console.error("Failed to send request to openweathermap.org", err);
    	} else {
    		if(body.cod === 200) {
    			var weath = "Conditions are " + body.weather[0].main + " and temperature is " + body.main.temp + ' C';
    			var response = {city: body.name, weather: weath};
    			return res.status(200).send(response);
    		} else {
                return res.status(400).send({msg:'Failed'});
            }
    	}
    });

};
router.get('/getWeather', exports.getWeather);


exports.getWeather2 = function(req, res) {
	var zip = req.query.zip;
	if( (zip === null) || (typeof(zip) === 'undefined') ) {
		return res.status(400).send('zip missing');
	}

	var aurl = OPENWEATHERURL + '&zip=' + zip + ',us';

	request({
		method: 'GET',
        url: aurl,
  		json: true
    }, function(err, resp, body) {
    	if(err) {
    		res.status(400).send('Failed to get the data');
    		//console.error("Failed to send request to openweathermap.org", err);
    	} else {
    		if(body.cod === 200) {
    			var weath = "Conditions are " + body.weather[0].main + " and temperature is " + body.main.temp + ' C';
    			var response = {city: body.name, weather: weath};
    			return res.status(200).send(response);
    		} else {
                return res.status(400).send({msg:'Failed'});
            }
    	}
    });

};
router.get('/getWeather2', exports.getWeather2);
*/

exports.getWeatherCity = function(req, res) {
	var city = req.query.city;
	if( (city === null) || (typeof(city) === 'undefined') ) {
		return res.status(400).send('city missing');
	}

	var aurl = OPENWEATHERURL + '&q=' + city + ',nz';
	request({
		method: 'GET',
        url: aurl,
  		json: true
    }, function(err, resp, body) {
    	if(err) {
    		res.status(400).send('Failed to get the data');
    		//console.error("Failed to send request to openweathermap.org", err);
    	} else {
    		if(body.cod === 200) {
    			var weath = "Conditions are " + body.weather[0].main + " and temperature is " + body.main.temp + ' C';
    			var longdata = body.coord.lon;
    			var latdata = body.coord.lat;
    			var response = {city: body.name, weather: weath, long: longdata, lat: latdata};
    			return res.status(200).send(response);
    		} else {
                return res.status(400).send({msg:'Failed'});
            }
    	}
    });

};
router.get('/getWeatherCity', exports.getWeatherCity);
/*
exports.getWeatherLongLat = function(req, res) {
    var long = req.query.long;
    var lat = req.query.lat;
    if( (long === null) || (typeof(long) === 'undefined') ) {
        return res.status(400).send('long missing');
    }
    else if( (lat === null) || (typeof(lat) === 'undefined') ) {
        return res.status(400).send('lat missing');
    }
    // /api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}
    var aurl = OPENWEATHERURL + '&lat=' + lat + '&lon=' + long;
    request({
        method: 'GET',
        url: aurl,
        json: true
    }, function(err, resp, body) {
        if(err) {
            res.status(400).send('Failed to get the data');
            //console.error("Failed to send request to openweathermap.org", err);
        } else {
            if(body.cod === 200) {
                var weath = "Conditions are " + body.weather[0].main + " and temperature is " + body.main.temp + ' C';
                var response = {city: body.name, weather: weath};
                return res.status(200).send(response);
            } else {
                return res.status(400).send({msg:'Failed'});
            }
        }
    });

};
router.get('/getWeatherLongLat', exports.getWeatherCity);*/
exports.router = router;
