app.directive('leaflet', function(){
  return {
    scope: {},
    bindToController: {
      stations: '='
    },
    controller: 'leafletController as ctrl',
    link: function(scope, element, attrs, ctrl){

      ctrl.init(element[0]);
      ctrl.addStations();

      scope.$watch('ctrl.stations', function(){
        ctrl.updateStations();
      })

    }
  }
});
