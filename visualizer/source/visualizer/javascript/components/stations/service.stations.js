app.factory('stationService', ['$resource', function($resource){
  return $resource('/api/stations/:stationID');
}]);
