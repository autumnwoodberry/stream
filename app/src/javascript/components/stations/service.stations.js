function StationsService($resource) {
  return $resource('http://127.0.0.1:8000/api/stations/:stationID');
}

StationsService.$inject = ['$resource'];

app.factory('StationsService', StationsService);
