var leafletController = (function(){

  function leafletController(){
    this.map;
  }

  leafletController.prototype.init = function(div){
    this.map = L.map(div).setView([39, -105.5], 7);
    L.tileLayer('http://{s}.tiles.mapbox.com/v3/w00dberry.jhjcg5gl/{z}/{x}/{y}.png').addTo(this.map);
  };

  leafletController.prototype.addStations = function(){
    var self = this;
    this.stations
      .$promise
      .then(function(stations){
        angular.forEach(stations, function(station, index){
            L.marker([station.latitude, station.longitude]).addTo(self.map);
        });
    });
  };

  leafletController.prototype.removeStations = function(){
    // remove all stations
  }

  leafletController.prototype.updateStations = function(){
    this.removeStations();
    this.addStations();
  }

  return leafletController;

})();

app.controller('leafletController', leafletController);
