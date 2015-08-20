var app = angular.module('stream', [
  'ngResource',
  'ui.router'
]);

app.config(['$locationProvider', '$interpolateProvider', '$stateProvider', '$urlRouterProvider', function($locationProvider, $interpolateProvider, $stateProvider, $urlRouterProvider) {

    $interpolateProvider.startSymbol('((');
    $interpolateProvider.endSymbol('))');

    $locationProvider.html5Mode(true).hashPrefix('!');

    $urlRouterProvider.otherwise('/stations');

    $stateProvider
    .state('stations', {
      url: '/stations',
      templateUrl: '/partials/stations.html'
    })
    .state('stations.details', {
      url:'/:stationID',
      templateUrl: '/partials/station-details.html'
    })

}]);
