class LeafletController {

    constructor($state) {
      this.$state = $state;
      this.map;
    }

    init(div) {
      // TODO move the lon/lat to directive
      this.map = L.map(div).setView([39, -105.5], 7);
      // TODO move map tiles URI to a constant
      let baseLayer = L.tileLayer('http://{s}.tiles.mapbox.com/v3/w00dberry.jhjcg5gl/{z}/{x}/{y}.png');
      baseLayer.addTo(this.map);
    };

    addStations() {
      // TODO add only stations that are not currently added to the map
      // using underscore to modify the local stations variable here
      this.stations.$promise.then((stations) => {
        stations.forEach((station, index) => {
          let marker = L.marker([station.latitude, station.longitude]);
          marker.stationID = station.id;
          marker.on('click', _.bind(this.markerClicked, this));
          marker.addTo(this.map);
        });
      });
    };

    markerClicked(event) {
      this.$state.go('stations.details', {
        stationID: event.target.stationID
      });
    }

    removeStations() {
      // TODO remove all stations from the map that aren't in this.stations
    }

    updateStations() {
      this.removeStations();
      this.addStations();
    }

}

LeafletController.$inject = ['$state'];

app.controller('leafletController', LeafletController);
