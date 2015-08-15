class MainController {

  constructor($scope, stationService) {
    this.$scope = $scope;

    $scope.stations = stationService.query();
    $scope.station;
    $scope.$on('leaflet::marker-clicked', (emit, message) => {
      this.updateStation(message.stationID);
    });
  }

  updateStation(stationID){
    this.$scope.station = _.findWhere(this.$scope.stations, {id: stationID});
    this.$scope.$apply();
  }

}

MainController.$inject = ['$scope', 'stationService']

app.controller('mainController', MainController);
