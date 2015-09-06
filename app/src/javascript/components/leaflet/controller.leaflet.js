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

      // TODO add all stations that aren't already on the map
      this.stations.forEach((station, index) => {

        let marker = L.marker([station.latitude, station.longitude], {
          title: station.name,
        });

        marker.stationID = station.id;

        // make the marker a clickable "link" to the station's details page
        marker.on('click', event => {
          this.$state.go('stations.details', {
            stationID: event.target.stationID,
          });
        });

        // add it to the map
        marker.addTo(this.map);
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
