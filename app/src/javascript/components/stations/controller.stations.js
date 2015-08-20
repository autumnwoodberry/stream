class StationsController {

  constructor(StationsService){
    this.stations = StationsService.query();
  }

}

StationsController['$inject'] = ['StationsService'];

angular.module('stream').controller('StationsController', StationsController)
