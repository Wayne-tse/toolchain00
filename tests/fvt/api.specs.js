
(function () {

    'use strict';

    var apiv1 = require('../../routes/apiv1');
    var assert = require('chai').assert;
    var REQUEST = require('request');

    var request = REQUEST.defaults( {
        strictSSL: false
    });

    var appUrl = process.env.APP_URL;
	//assert.fail(appUrl);
    describe('Get Weather', function() {
    	
    	it('with valid zip', function(done) {
        if(!appUrl) {
            assert.fail("Environment variable APP_URL is not defined");
            return done();
        }
        request({
      		method: 'GET',

              //url: appUrl + '/api/v1/getWeather?zip=78613'
          		//url: appUrl + '&q=Wellington,nz'
          		//url: appUrl + '/api/v1/getWeather?q=Wellington'
              //url: appUrl + '/api/v1/getWeather?zip=78613'
              url: appUrl + '/api/v1/getWeather?zip=78613'
          		//url: appUrl + '&q=Wellington,nz'
				
          }, function(err, resp, body) {
          	assert.fail('APPURL:' + appUrl);
          	if(err) {
          		assert.fail('Failed to get the response');
          	} else {
              assert.equal(resp.statusCode, 200);
              var pbody = JSON.parse(body);
              //assert((pbody.name === 'Wellington') || (pbody.country === 'NZ'), "names does not match request");
              assert((pbody.city === 'Anderson Mill') || (pbody.city === 'Round Rock'), "City name does not match");
              done();
            }
        });
    	});

      it('without zip code', function(done) {
        if(!appUrl) {
            assert.fail("Environment variable APP_URL is not defined");
            return done();
        }
        request({
      		method: 'GET',
              url: appUrl + '/api/v1/getWeather'
          }, /* @callback */ function(err, resp, body) {
          	if(err) {
          		assert.fail('Failed to get the response');
          	} else {
              assert.equal(resp.statusCode, 400);
              done();
            }
        });
    	});

      it('with another valid zip', function(done) {
        if(!appUrl) {
            assert.fail("Environment variable APP_URL is not defined");
            return done();
        }
        request({
      		method: 'GET',
              //url: appUrl + '&q=Hamilton,nz'
          		 url: appUrl + '/api/v1/getWeather?zip=78641'
          }, function(err, resp, body) {
          	if(err) {
          		assert.fail('Failed to get the response');
          	} else {
              assert.equal(resp.statusCode, 200);
              var pbody = JSON.parse(body);
              //assert(pbody.city === 'Hamilton', "City name does not match");
               assert(pbody.city === 'Round Rock', "City name does not match");
              done();
            }
        });
    	});
    });
})();
