app = angular.module('stream', ['ngResource']);

app.controller('streamController', ['$scope', 'stationService', function($scope, stationService){
  $scope.stations = stationService.query();
}]);
