'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var app = angular.module('stream', ['ngResource', 'ui.router']);

app.config(['$locationProvider', '$interpolateProvider', '$stateProvider', '$urlRouterProvider', function ($locationProvider, $interpolateProvider, $stateProvider, $urlRouterProvider) {

  $interpolateProvider.startSymbol('((');
  $interpolateProvider.endSymbol('))');

  $locationProvider.html5Mode(true).hashPrefix('!');

  $urlRouterProvider.otherwise('/stations');

  $stateProvider.state('stations', {
    url: '/stations',
    templateUrl: '/partials/stations.html'
  }).state('stations.details', {
    url: '/:stationID',
    templateUrl: '/partials/station-details.html'
  });
}]);

var LeafletController = (function () {
  function LeafletController($state) {
    _classCallCheck(this, LeafletController);

    this.$state = $state;
    this.map;
  }

  _createClass(LeafletController, [{
    key: 'init',
    value: function init(div) {
      // TODO move the lon/lat to directive
      this.map = L.map(div).setView([39, -105.5], 7);
      // TODO move map tiles URI to a constant
      var layer = L.tileLayer('http://{s}.tiles.mapbox.com/v3/w00dberry.jhjcg5gl/{z}/{x}/{y}.png');
      layer.addTo(this.map);
      this.addStations();
    }
  }, {
    key: 'addStations',
    value: function addStations() {
      var _this = this;

      // TODO add only stations that are not currently added to the map
      // using underscore to modify the local stations variable here
      this.stations.$promise.then(function (stations) {
        stations.forEach(function (station, index) {
          var marker = L.marker([station.latitude, station.longitude]);
          marker.stationID = station.id;
          marker.on('click', _.bind(_this.markerClicked, _this));
          marker.addTo(_this.map);
        });
      });
    }
  }, {
    key: 'markerClicked',
    value: function markerClicked(event) {
      this.$state.go('stations.details', {
        stationID: event.target.stationID
      });
    }
  }, {
    key: 'removeStations',
    value: function removeStations() {
      // TODO remove all stations from the map that aren't in this.stations
    }
  }, {
    key: 'updateStations',
    value: function updateStations() {
      this.removeStations();
      this.addStations();
    }
  }]);

  return LeafletController;
})();

LeafletController.$inject = ['$state'];

app.controller('leafletController', LeafletController);

function leaflet() {
  return {
    scope: {},
    bindToController: {
      stations: '='
    },
    controller: 'leafletController as ctrl',
    link: function link(scope, element, attrs, ctrl) {
      ctrl.init(element[0], scope);
    }
  };
};

app.directive('leaflet', leaflet);

var StationDetailsController = function StationDetailsController(StationsService, $stateParams) {
  _classCallCheck(this, StationDetailsController);

  this.selectedStation = StationsService.get({ stationID: $stateParams.stationID });
};

StationDetailsController['$inject'] = ['StationsService', '$stateParams'];

angular.module('stream').controller('StationDetailsController', StationDetailsController);

var StationsController = function StationsController(StationsService) {
  _classCallCheck(this, StationsController);

  this.stations = StationsService.query();
};

StationsController['$inject'] = ['StationsService'];

angular.module('stream').controller('StationsController', StationsController);

function StationsService($resource) {
  return $resource('http://127.0.0.1:8000/api/stations/:stationID');
}

StationsService.$inject = ['$resource'];

app.factory('StationsService', StationsService);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImphdmFzY3JpcHQvbWFpbi5qcyIsImphdmFzY3JpcHQvY29tcG9uZW50cy9sZWFmbGV0L2NvbnRyb2xsZXIubGVhZmxldC5qcyIsImphdmFzY3JpcHQvY29tcG9uZW50cy9sZWFmbGV0L2RpcmVjdGl2ZS5sZWFmbGV0LmpzIiwiamF2YXNjcmlwdC9jb21wb25lbnRzL3N0YXRpb25zL2NvbnRyb2xsZXIuc3RhdGlvbi1kZXRhaWxzLmpzIiwiamF2YXNjcmlwdC9jb21wb25lbnRzL3N0YXRpb25zL2NvbnRyb2xsZXIuc3RhdGlvbnMuanMiLCJqYXZhc2NyaXB0L2NvbXBvbmVudHMvc3RhdGlvbnMvc2VydmljZS5zdGF0aW9ucy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxJQUFBLEdBQUEsR0FBQSxPQUFBLENBQUEsTUFBQSxDQUFBLFFBQUEsRUFBQSxDQUNBLFlBQUEsRUFDQSxXQUFBLENBQ0EsQ0FBQSxDQUFBOztBQUVBLEdBQUEsQ0FBQSxNQUFBLENBQUEsQ0FBQSxtQkFBQSxFQUFBLHNCQUFBLEVBQUEsZ0JBQUEsRUFBQSxvQkFBQSxFQUFBLFVBQUEsaUJBQUEsRUFBQSxvQkFBQSxFQUFBLGNBQUEsRUFBQSxrQkFBQSxFQUFBOztBQUVBLHNCQUFBLENBQUEsV0FBQSxDQUFBLElBQUEsQ0FBQSxDQUFBO0FBQ0Esc0JBQUEsQ0FBQSxTQUFBLENBQUEsSUFBQSxDQUFBLENBQUE7O0FBRUEsbUJBQUEsQ0FBQSxTQUFBLENBQUEsSUFBQSxDQUFBLENBQUEsVUFBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBOztBQUVBLG9CQUFBLENBQUEsU0FBQSxDQUFBLFdBQUEsQ0FBQSxDQUFBOztBQUVBLGdCQUFBLENBQ0EsS0FBQSxDQUFBLFVBQUEsRUFBQTtBQUNBLE9BQUEsRUFBQSxXQUFBO0FBQ0EsZUFBQSxFQUFBLHlCQUFBO0dBQ0EsQ0FBQSxDQUNBLEtBQUEsQ0FBQSxrQkFBQSxFQUFBO0FBQ0EsT0FBQSxFQUFBLGFBQUE7QUFDQSxlQUFBLEVBQUEsZ0NBQUE7R0FDQSxDQUFBLENBQUE7Q0FFQSxDQUFBLENBQUEsQ0FBQTs7SUN4QkEsaUJBQUE7QUFFQSxXQUZBLGlCQUFBLENBRUEsTUFBQSxFQUFBOzBCQUZBLGlCQUFBOztBQUdBLFFBQUEsQ0FBQSxNQUFBLEdBQUEsTUFBQSxDQUFBO0FBQ0EsUUFBQSxDQUFBLEdBQUEsQ0FBQTtHQUNBOztlQUxBLGlCQUFBOztXQU9BLGNBQUEsR0FBQSxFQUFBOztBQUVBLFVBQUEsQ0FBQSxHQUFBLEdBQUEsQ0FBQSxDQUFBLEdBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxPQUFBLENBQUEsQ0FBQSxFQUFBLEVBQUEsQ0FBQSxLQUFBLENBQUEsRUFBQSxDQUFBLENBQUEsQ0FBQTs7QUFFQSxVQUFBLEtBQUEsR0FBQSxDQUFBLENBQUEsU0FBQSxDQUFBLG1FQUFBLENBQUEsQ0FBQTtBQUNBLFdBQUEsQ0FBQSxLQUFBLENBQUEsSUFBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBO0FBQ0EsVUFBQSxDQUFBLFdBQUEsRUFBQSxDQUFBO0tBQ0E7OztXQUVBLHVCQUFBOzs7OztBQUdBLFVBQUEsQ0FBQSxRQUFBLENBQUEsUUFBQSxDQUFBLElBQUEsQ0FBQSxVQUFBLFFBQUEsRUFBQTtBQUNBLGdCQUFBLENBQUEsT0FBQSxDQUFBLFVBQUEsT0FBQSxFQUFBLEtBQUEsRUFBQTtBQUNBLGNBQUEsTUFBQSxHQUFBLENBQUEsQ0FBQSxNQUFBLENBQUEsQ0FBQSxPQUFBLENBQUEsUUFBQSxFQUFBLE9BQUEsQ0FBQSxTQUFBLENBQUEsQ0FBQSxDQUFBO0FBQ0EsZ0JBQUEsQ0FBQSxTQUFBLEdBQUEsT0FBQSxDQUFBLEVBQUEsQ0FBQTtBQUNBLGdCQUFBLENBQUEsRUFBQSxDQUFBLE9BQUEsRUFBQSxDQUFBLENBQUEsSUFBQSxDQUFBLE1BQUEsYUFBQSxRQUFBLENBQUEsQ0FBQTtBQUNBLGdCQUFBLENBQUEsS0FBQSxDQUFBLE1BQUEsR0FBQSxDQUFBLENBQUE7U0FDQSxDQUFBLENBQUE7T0FDQSxDQUFBLENBQUE7S0FDQTs7O1dBRUEsdUJBQUEsS0FBQSxFQUFBO0FBQ0EsVUFBQSxDQUFBLE1BQUEsQ0FBQSxFQUFBLENBQUEsa0JBQUEsRUFBQTtBQUNBLGlCQUFBLEVBQUEsS0FBQSxDQUFBLE1BQUEsQ0FBQSxTQUFBO09BQ0EsQ0FBQSxDQUFBO0tBQ0E7OztXQUVBLDBCQUFBOztLQUVBOzs7V0FFQSwwQkFBQTtBQUNBLFVBQUEsQ0FBQSxjQUFBLEVBQUEsQ0FBQTtBQUNBLFVBQUEsQ0FBQSxXQUFBLEVBQUEsQ0FBQTtLQUNBOzs7U0ExQ0EsaUJBQUE7OztBQThDQSxpQkFBQSxDQUFBLE9BQUEsR0FBQSxDQUFBLFFBQUEsQ0FBQSxDQUFBOztBQUVBLEdBQUEsQ0FBQSxVQUFBLENBQUEsbUJBQUEsRUFBQSxpQkFBQSxDQUFBLENBQUE7O0FDaERBLFNBQUEsT0FBQSxHQUFBO0FBQ0EsU0FBQTtBQUNBLFNBQUEsRUFBQSxFQUFBO0FBQ0Esb0JBQUEsRUFBQTtBQUNBLGNBQUEsRUFBQSxHQUFBO0tBQ0E7QUFDQSxjQUFBLEVBQUEsMkJBQUE7QUFDQSxRQUFBLEVBQUEsY0FBQSxLQUFBLEVBQUEsT0FBQSxFQUFBLEtBQUEsRUFBQSxJQUFBLEVBQUE7QUFDQSxVQUFBLENBQUEsSUFBQSxDQUFBLE9BQUEsQ0FBQSxDQUFBLENBQUEsRUFBQSxLQUFBLENBQUEsQ0FBQTtLQUNBO0dBQ0EsQ0FBQTtDQUNBLENBQUE7O0FBRUEsR0FBQSxDQUFBLFNBQUEsQ0FBQSxTQUFBLEVBQUEsT0FBQSxDQUFBLENBQUE7O0lDYkEsd0JBQUEsR0FFQSxTQUZBLHdCQUFBLENBRUEsZUFBQSxFQUFBLFlBQUEsRUFBQTt3QkFGQSx3QkFBQTs7QUFHQSxNQUFBLENBQUEsZUFBQSxHQUFBLGVBQUEsQ0FBQSxHQUFBLENBQUEsRUFBQSxTQUFBLEVBQUEsWUFBQSxDQUFBLFNBQUEsRUFBQSxDQUFBLENBQUE7Q0FDQTs7QUFJQSx3QkFBQSxDQUFBLFNBQUEsQ0FBQSxHQUFBLENBQUEsaUJBQUEsRUFBQSxjQUFBLENBQUEsQ0FBQTs7QUFFQSxPQUFBLENBQUEsTUFBQSxDQUFBLFFBQUEsQ0FBQSxDQUFBLFVBQUEsQ0FBQSwwQkFBQSxFQUFBLHdCQUFBLENBQUEsQ0FBQTs7SUNWQSxrQkFBQSxHQUVBLFNBRkEsa0JBQUEsQ0FFQSxlQUFBLEVBQUE7d0JBRkEsa0JBQUE7O0FBR0EsTUFBQSxDQUFBLFFBQUEsR0FBQSxlQUFBLENBQUEsS0FBQSxFQUFBLENBQUE7Q0FDQTs7QUFJQSxrQkFBQSxDQUFBLFNBQUEsQ0FBQSxHQUFBLENBQUEsaUJBQUEsQ0FBQSxDQUFBOztBQUVBLE9BQUEsQ0FBQSxNQUFBLENBQUEsUUFBQSxDQUFBLENBQUEsVUFBQSxDQUFBLG9CQUFBLEVBQUEsa0JBQUEsQ0FBQSxDQUFBOztBQ1ZBLFNBQUEsZUFBQSxDQUFBLFNBQUEsRUFBQTtBQUNBLFNBQUEsU0FBQSxDQUFBLCtDQUFBLENBQUEsQ0FBQTtDQUNBOztBQUVBLGVBQUEsQ0FBQSxPQUFBLEdBQUEsQ0FBQSxXQUFBLENBQUEsQ0FBQTs7QUFFQSxHQUFBLENBQUEsT0FBQSxDQUFBLGlCQUFBLEVBQUEsZUFBQSxDQUFBLENBQUEiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKCdzdHJlYW0nLCBbXG4gICduZ1Jlc291cmNlJyxcbiAgJ3VpLnJvdXRlcidcbl0pO1xuXG5hcHAuY29uZmlnKFsnJGxvY2F0aW9uUHJvdmlkZXInLCAnJGludGVycG9sYXRlUHJvdmlkZXInLCAnJHN0YXRlUHJvdmlkZXInLCAnJHVybFJvdXRlclByb3ZpZGVyJywgZnVuY3Rpb24oJGxvY2F0aW9uUHJvdmlkZXIsICRpbnRlcnBvbGF0ZVByb3ZpZGVyLCAkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyKSB7XG5cbiAgICAkaW50ZXJwb2xhdGVQcm92aWRlci5zdGFydFN5bWJvbCgnKCgnKTtcbiAgICAkaW50ZXJwb2xhdGVQcm92aWRlci5lbmRTeW1ib2woJykpJyk7XG5cbiAgICAkbG9jYXRpb25Qcm92aWRlci5odG1sNU1vZGUodHJ1ZSkuaGFzaFByZWZpeCgnIScpO1xuXG4gICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnL3N0YXRpb25zJyk7XG5cbiAgICAkc3RhdGVQcm92aWRlclxuICAgIC5zdGF0ZSgnc3RhdGlvbnMnLCB7XG4gICAgICB1cmw6ICcvc3RhdGlvbnMnLFxuICAgICAgdGVtcGxhdGVVcmw6ICcvcGFydGlhbHMvc3RhdGlvbnMuaHRtbCdcbiAgICB9KVxuICAgIC5zdGF0ZSgnc3RhdGlvbnMuZGV0YWlscycsIHtcbiAgICAgIHVybDonLzpzdGF0aW9uSUQnLFxuICAgICAgdGVtcGxhdGVVcmw6ICcvcGFydGlhbHMvc3RhdGlvbi1kZXRhaWxzLmh0bWwnXG4gICAgfSlcblxufV0pO1xuIiwiY2xhc3MgTGVhZmxldENvbnRyb2xsZXIge1xuXG4gICAgY29uc3RydWN0b3IoJHN0YXRlKSB7XG4gICAgICB0aGlzLiRzdGF0ZSA9ICRzdGF0ZTtcbiAgICAgIHRoaXMubWFwO1xuICAgIH1cblxuICAgIGluaXQoZGl2KSB7XG4gICAgICAvLyBUT0RPIG1vdmUgdGhlIGxvbi9sYXQgdG8gZGlyZWN0aXZlXG4gICAgICB0aGlzLm1hcCA9IEwubWFwKGRpdikuc2V0VmlldyhbMzksIC0xMDUuNV0sIDcpO1xuICAgICAgLy8gVE9ETyBtb3ZlIG1hcCB0aWxlcyBVUkkgdG8gYSBjb25zdGFudFxuICAgICAgbGV0IGxheWVyID0gTC50aWxlTGF5ZXIoJ2h0dHA6Ly97c30udGlsZXMubWFwYm94LmNvbS92My93MDBkYmVycnkuamhqY2c1Z2wve3p9L3t4fS97eX0ucG5nJyk7XG4gICAgICBsYXllci5hZGRUbyh0aGlzLm1hcCk7XG4gICAgICB0aGlzLmFkZFN0YXRpb25zKCk7XG4gICAgfTtcblxuICAgIGFkZFN0YXRpb25zKCkge1xuICAgICAgLy8gVE9ETyBhZGQgb25seSBzdGF0aW9ucyB0aGF0IGFyZSBub3QgY3VycmVudGx5IGFkZGVkIHRvIHRoZSBtYXBcbiAgICAgIC8vIHVzaW5nIHVuZGVyc2NvcmUgdG8gbW9kaWZ5IHRoZSBsb2NhbCBzdGF0aW9ucyB2YXJpYWJsZSBoZXJlXG4gICAgICB0aGlzLnN0YXRpb25zLiRwcm9taXNlLnRoZW4oKHN0YXRpb25zKSA9PiB7XG4gICAgICAgIHN0YXRpb25zLmZvckVhY2goKHN0YXRpb24sIGluZGV4KSA9PiB7XG4gICAgICAgICAgbGV0IG1hcmtlciA9IEwubWFya2VyKFtzdGF0aW9uLmxhdGl0dWRlLCBzdGF0aW9uLmxvbmdpdHVkZV0pO1xuICAgICAgICAgIG1hcmtlci5zdGF0aW9uSUQgPSBzdGF0aW9uLmlkO1xuICAgICAgICAgIG1hcmtlci5vbignY2xpY2snLCBfLmJpbmQodGhpcy5tYXJrZXJDbGlja2VkLCB0aGlzKSk7XG4gICAgICAgICAgbWFya2VyLmFkZFRvKHRoaXMubWFwKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgbWFya2VyQ2xpY2tlZChldmVudCkge1xuICAgICAgdGhpcy4kc3RhdGUuZ28oJ3N0YXRpb25zLmRldGFpbHMnLCB7XG4gICAgICAgIHN0YXRpb25JRDogZXZlbnQudGFyZ2V0LnN0YXRpb25JRFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVtb3ZlU3RhdGlvbnMoKSB7XG4gICAgICAvLyBUT0RPIHJlbW92ZSBhbGwgc3RhdGlvbnMgZnJvbSB0aGUgbWFwIHRoYXQgYXJlbid0IGluIHRoaXMuc3RhdGlvbnNcbiAgICB9XG5cbiAgICB1cGRhdGVTdGF0aW9ucygpIHtcbiAgICAgIHRoaXMucmVtb3ZlU3RhdGlvbnMoKTtcbiAgICAgIHRoaXMuYWRkU3RhdGlvbnMoKTtcbiAgICB9XG5cbn1cblxuTGVhZmxldENvbnRyb2xsZXIuJGluamVjdCA9IFsnJHN0YXRlJ107XG5cbmFwcC5jb250cm9sbGVyKCdsZWFmbGV0Q29udHJvbGxlcicsIExlYWZsZXRDb250cm9sbGVyKTtcbiIsImZ1bmN0aW9uIGxlYWZsZXQoKSB7XG4gIHJldHVybiB7XG4gICAgc2NvcGU6IHt9LFxuICAgIGJpbmRUb0NvbnRyb2xsZXI6IHtcbiAgICAgIHN0YXRpb25zOiAnPSdcbiAgICB9LFxuICAgIGNvbnRyb2xsZXI6ICdsZWFmbGV0Q29udHJvbGxlciBhcyBjdHJsJyxcbiAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMsIGN0cmwpe1xuICAgICAgY3RybC5pbml0KGVsZW1lbnRbMF0sIHNjb3BlKTtcbiAgICB9XG4gIH1cbn07XG5cbmFwcC5kaXJlY3RpdmUoJ2xlYWZsZXQnLCBsZWFmbGV0KTtcbiIsImNsYXNzIFN0YXRpb25EZXRhaWxzQ29udHJvbGxlciB7XG5cbiAgY29uc3RydWN0b3IoU3RhdGlvbnNTZXJ2aWNlLCAkc3RhdGVQYXJhbXMpe1xuICAgIHRoaXMuc2VsZWN0ZWRTdGF0aW9uID0gU3RhdGlvbnNTZXJ2aWNlLmdldCh7IHN0YXRpb25JRDogJHN0YXRlUGFyYW1zLnN0YXRpb25JRCB9KTtcbiAgfVxuXG59XG5cblN0YXRpb25EZXRhaWxzQ29udHJvbGxlclsnJGluamVjdCddID0gWydTdGF0aW9uc1NlcnZpY2UnLCAnJHN0YXRlUGFyYW1zJ107XG5cbmFuZ3VsYXIubW9kdWxlKCdzdHJlYW0nKS5jb250cm9sbGVyKCdTdGF0aW9uRGV0YWlsc0NvbnRyb2xsZXInLCBTdGF0aW9uRGV0YWlsc0NvbnRyb2xsZXIpO1xuIiwiY2xhc3MgU3RhdGlvbnNDb250cm9sbGVyIHtcblxuICBjb25zdHJ1Y3RvcihTdGF0aW9uc1NlcnZpY2Upe1xuICAgIHRoaXMuc3RhdGlvbnMgPSBTdGF0aW9uc1NlcnZpY2UucXVlcnkoKTtcbiAgfVxuXG59XG5cblN0YXRpb25zQ29udHJvbGxlclsnJGluamVjdCddID0gWydTdGF0aW9uc1NlcnZpY2UnXTtcblxuYW5ndWxhci5tb2R1bGUoJ3N0cmVhbScpLmNvbnRyb2xsZXIoJ1N0YXRpb25zQ29udHJvbGxlcicsIFN0YXRpb25zQ29udHJvbGxlcilcbiIsImZ1bmN0aW9uIFN0YXRpb25zU2VydmljZSgkcmVzb3VyY2Upe1xuICByZXR1cm4gJHJlc291cmNlKCdodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL3N0YXRpb25zLzpzdGF0aW9uSUQnKTtcbn1cblxuU3RhdGlvbnNTZXJ2aWNlLiRpbmplY3QgPSBbJyRyZXNvdXJjZSddO1xuXG5hcHAuZmFjdG9yeSgnU3RhdGlvbnNTZXJ2aWNlJywgU3RhdGlvbnNTZXJ2aWNlKTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==