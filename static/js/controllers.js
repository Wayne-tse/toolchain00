
var ConsoleModule = angular.module('ConsoleModule', ['ngRoute']);




ConsoleModule.config(['$routeProvider', '$locationProvider','$sceDelegateProvider', '$httpProvider',
    function ($routeProvider, $locationProvider, $sceDelegateProvider, $httpProvider) {
    $routeProvider.when('/', {
        templateUrl: '/partials/Byzip.html',
        controller: 'wcontroller',
        controllerAs: 'wcontroller'
    });
}]);


/*
function putPins(cities) {

    for (i = 0; i < cities.length; i++){
        addMarker(cities[i], map);       
    }
}*/

function addMarker(location, map) {
  var marker = new google.maps.Marker({
    position: location,
    map: map
  });
}

ConsoleModule.controller('wcontroller', ['$scope', '$http', '$routeParams', '$timeout', '$sce',
    function($scope, $http, $routeParams, $timeout, $sce) {
    $scope.somemessage = "Some weather";
    $scope.zip1Weather = "";
	var cities = [];
	var locationNz = {lat: -41.838875, lng: 171.7799};
	addMarker(locationNz, map);
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
                } else if(which === 2) {
                    $scope.zip2City = response.data.city;
                    $scope.zip2Weather = response.data.weather;
                    cities[1] = response.data.city;
                } else if(which === 3) {
                    $scope.zip3City = response.data.city;
                    $scope.zip3Weather = response.data.weather;
                    cities[2] = response.data.city;
                } else if(which === 4) {
                    $scope.zip4City = response.data.city;
                    $scope.zip4Weather = response.data.weather;
                    cities[3] = response.data.city;
                } 
            });
    	//}
	};

    
}]);

	    
	    