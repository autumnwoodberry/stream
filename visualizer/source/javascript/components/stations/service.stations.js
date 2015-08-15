function StationService($resource){
  return $resource('/api/stations/:stationID');
}

StationService.$inject = ['$resource'];

app.factory('stationService', StationService);
