function leaflet() {
  return {
    scope: {},
    bindToController: {
      stations: '='
    },
    controller: 'leafletController as ctrl',
    link: function(scope, element, attrs, ctrl){
      ctrl.init(element[0], scope);
    }
  }
};

app.directive('leaflet', leaflet);
