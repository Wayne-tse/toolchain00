 
var ConsoleModule = angular.module('ConsoleModule', ['ngRoute']);

var markers= [];
var map;

ConsoleModule.config(['$routeProvider', '$locationProvider','$sceDelegateProvider', '$httpProvider',
    function ($routeProvider, $locationProvider, $sceDelegateProvider, $httpProvider) {
    $routeProvider.when('/', {
        templateUrl: '/partials/Byzip.html',
        controller: 'wcontroller',
        controllerAs: 'wcontroller'
    });
}]);


function initMap() {
      	locationNz = {lat: -41.838875, lng: 171.7799};
        map = new google.maps.Map(document.getElementById('map'), {
          center: locationNz,
          zoom: 5,
          gestureHandling: 'none',
          zoomControl: false
     	});
        
    google.maps.event.addListener(map, 'click', function(event) {
    //addMarker(event.latLng, map);
	});

       
}


function putPins(cities,lat,long) {
markers = [];
setMapMarkers(null);//dereferences markers
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
    $scope.zip1Weather = "";
	var cities = [];
	var lat = [];
	var long = [];

    $scope.zip = function(which) {

        var data = "";
        if(which === 1) {
            data = $scope.zip1m;
        } else if(which === 2) {
            data = $scope.zip2m;
        } else if(which === 3) {
            data = $scope.zip3m;
        } else if(which === 4) {
            data = $scope.zip4m;
        } 

        $http({
                method: "GET",
                url: '/api/v1/getWeatherCity?city=' + data
            }).then( function(response) {
                if(which === 1) {
                    $scope.zip1City = response.data.city;
                    $scope.zip1Weather = response.data.weather;
                    cities[0] = response.data.city;
                    lat[0] = response.data.coord.lat;
                    long[0] = response.data.coord.lon;
                } else if(which === 2) {
                    $scope.zip2City = response.data.city;
                    $scope.zip2Weather = response.data.weather;
                    cities[1] = response.data.city;
                    lat[1] = response.data.coord.lat;
                    long[1] = response.data.coord.lon;
                } else if(which === 3) {
                    $scope.zip3City = response.data.city;
                    $scope.zip3Weather = response.data.weather;
                    cities[2] = response.data.city;
                    lat[2] = response.data.coord.lat;
                    long[2] = response.data.coord.lon;
                } else if(which === 4) {
                    $scope.zip4City = response.data.city;
                    $scope.zip4Weather = response.data.weather;
                    cities[3] = response.data.city;
                    lat[3] = response.data.coord.lat;
                    long[3] = response.data.coord.lon;
                } 
                putPins(cities,lat,long);
            });
    	//}
	};

    
}]);

	    
	    