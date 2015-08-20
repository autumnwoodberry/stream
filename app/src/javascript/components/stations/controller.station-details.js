class StationDetailsController {

  constructor(StationsService, $stateParams){
    this.selectedStation = StationsService.get({ stationID: $stateParams.stationID });
  }

}

StationDetailsController['$inject'] = ['StationsService', '$stateParams'];

angular.module('stream').controller('StationDetailsController', StationDetailsController);
