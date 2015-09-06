function leaflet() {
  return {
    scope: {},
    bindToController: {
      stations: '=',
    },
    controller: 'leafletController as ctrl',
    link: (scope, element, attrs, ctrl) => {

      ctrl.init(element[0]);

      scope.$watch('ctrl.stations', (stations) => {
        ctrl.updateStations();
      }, true);

    }
  }
};

app.directive('leaflet', leaflet);
