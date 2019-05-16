 
var ConsoleModule = angular.module('ConsoleModule', ['ngRoute']);

var markers= [];
var map;
var cities = [];
var lat = [];
var long = [];


ConsoleModule.config(['$routeProvider', '$locationProvider','$sceDelegateProvider', '$httpProvider',
    function ($routeProvider, $locationProvider, $sceDelegateProvider, $httpProvider) {
    $routeProvider.when('/', {
        templateUrl: '/partials/Bycity.html',
        controller: 'wcontroller',
        controllerAs: 'wcontroller'
    });
}]);
/*
function initMap() {
      	var locationNz = {lat: -41.838875, lng: 171.7799};
        map = new google.maps.Map(document.getElementById('map'), {
          center: locationNz,
          zoom: 5,
          gestureHandling: 'none',
          zoomControl: false
     	});
        
   	google.maps.event.addListener(map, 'click', function(event) {
    var latitude = event.latLng.lat;
    var longitude = event.latLng.lon;
    $http({
                method: "GET",
                url: '/api/v1/getWeatherPos?lat=' + latitude +'&long' + longitude
            }).then( function(response) {
            	var city = response.data.city;
            	if ((city != null) || typeof(city) != 'undefined')
            	{            	
            		$scope.city1 = response.data.city;
	            	$scope.city1Weather = response.data.weather;
	            	cities[0] = response.data.city;
	            	lat[0] = response.data.coord.lat;
	            	long[0] = response.data.coord.lon;
	            }


            });
	});

       
}*/

var initMap = function(){
	      var locationNz = {lat: -41.838875, lng: 171.7799};
          map = new google.maps.Map(document.getElementById('map'), {
          center: locationNz,
          zoom: 5,
          gestureHandling: 'none',
          zoomControl: false
     	});/*
     	google.maps.event.addListener(map, 'click', function($scope, $http, event) {
     	var latitude = event.latLng.lat;
    	var longitude = event.latLng.lon;
     	$http({
                method: "GET",
                url: '/api/v1/getWeatherPos?lat=' + latitude +'&long' + longitude
            }).then( function(response) {
            	var city = response.data.city;
            	if ((city !== null) || typeof city !== 'undefined')
            	{            	
            		$scope.city1 = response.data.city;
	            	$scope.city1Weather = response.data.weather;
	            	cities[0] = response.data.city;
	            	lat[0] = response.data.coord.lat;
	            	long[0] = response.data.coord.lon;
	            }


            });
        });*/

	};
	



function putPins(cities,lat,long) {
	setMapMarkers(null);//dereferences markers
markers = [];

    for (i = 0; i < cities.length; i++){
    	var point = {lat: lat[i], lng: long[i]};
        addMarker(point, map);       
    }
    
    setMapMarkers(map);
}

function addMarker(location, map) {
  var marker = new google.maps.Marker({
    position: location,
    map: map
  });
  markers.push(marker);
}

function setMapMarkers(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}



ConsoleModule.controller('wcontroller', ['$scope', '$http', '$routeParams', '$timeout', '$sce',
    function($scope, $http, $routeParams, $timeout, $sce) {
    $scope.somemessage = "Some weather";
    $scope.city1Weather = "";

    $scope.city = function(which) {

        var data = "";
        if(which === 1) {
            data = $scope.city1m;
        } else if(which === 2) {
            data = $scope.city2m;
        } else if(which === 3) {
            data = $scope.city3m;
        } else if(which === 4) {
            data = $scope.city4m;
        } 

        $http({
                method: "GET",
                url: '/api/v1/getWeatherCity?city=' + data
            }).then( function(response) {
                if(which === 1) {
                    $scope.city1 = response.data.city;
                    $scope.city1Weather = response.data.weather;
                    cities[0] = response.data.city;
                    lat[0] = response.data.coord.lat;
                    long[0] = response.data.coord.lon;
                } else if(which === 2) {
                    $scope.city2 = response.data.city;
                    $scope.city2Weather = response.data.weather;
                    cities[1] = response.data.city;
                    lat[1] = response.data.coord.lat;
                    long[1] = response.data.coord.lon;
                } else if(which === 3) {
                    $scope.city3 = response.data.city;
                    $scope.city3Weather = response.data.weather;
                    cities[2] = response.data.city;
                    lat[2] = response.data.coord.lat;
                    long[2] = response.data.coord.lon;
                } else if(which === 4) {
                    $scope.city4 = response.data.city;
                    $scope.city4Weather = response.data.weather;
                    cities[3] = response.data.city;
                    lat[3] = response.data.coord.lat;
                    long[3] = response.data.coord.lon;
                } 
                putPins(cities,lat,long);
            });
    
	};
	
	google.maps.event.addListener(map, 'click', function(event) {
    var latitude = event.latLng.lat();
    var longitude = event.latLng.lng();
    $http({
                method: "GET",
                url: '/api/v1/getWeatherPos?lat=' + latitude +'&long=' + longitude
            }).then( function(response) {
            	var city = response.data.city;
            	if ((city !== null) || typeof city !== 'undefined')
            	{
            		var i = 3;
            		if ((cities[0] === null) || typeof cities[0] === 'undefined')
            		{
            			$scope.city1m = response.data.city;
            			$scope.city1 = response.data.city;
	            		$scope.city1Weather = response.data.weather;
	            		i = 0;
            		}
            		else if ($scope.city2m === "")
            		{
            			$scope.city2m = response.data.city;
            			$scope.city2 = response.data.city;
	            		$scope.city2Weather = response.data.weather;
       					i = 1;
            		}
					else if ($scope.city3m === "")
            		{
            			$scope.city3m = response.data.city;
            			$scope.city3 = response.data.city;
	            		$scope.city3Weather = response.data.weather;
						i = 2;
            		}
					else
            		{
            			$scope.city4m = response.data.city;
            			$scope.city4 = response.data.city;
	            		$scope.city4Weather = response.data.weather;

            		}
            		    cities[i] = response.data.city;
		            	lat[i] = response.data.coord.lat;
		            	long[i] = response.data.coord.lon;
	            }
				putPins(cities,lat,long);

            });
	});

    
}]);

	    
	    