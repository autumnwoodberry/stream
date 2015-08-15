'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var app = angular.module('stream', ['ngResource']);

app.config(['$interpolateProvider', function ($interpolateProvider) {
  $interpolateProvider.startSymbol('((');
  $interpolateProvider.endSymbol('))');
}]);

var LeafletController = (function () {
  function LeafletController($scope) {
    _classCallCheck(this, LeafletController);

    this.$scope = $scope;
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
      this.$scope.$emit('leaflet::marker-clicked', {
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

LeafletController.$inject = ['$scope'];

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

var MainController = (function () {
  function MainController($scope, stationService) {
    var _this2 = this;

    _classCallCheck(this, MainController);

    this.$scope = $scope;

    $scope.stations = stationService.query();
    $scope.station;
    $scope.$on('leaflet::marker-clicked', function (emit, message) {
      _this2.updateStation(message.stationID);
    });
  }

  _createClass(MainController, [{
    key: 'updateStation',
    value: function updateStation(stationID) {
      this.$scope.station = _.findWhere(this.$scope.stations, { id: stationID });
      this.$scope.$apply();
    }
  }]);

  return MainController;
})();

MainController.$inject = ['$scope', 'stationService'];

app.controller('mainController', MainController);

function StationService($resource) {
  return $resource('/api/stations/:stationID');
}

StationService.$inject = ['$resource'];

app.factory('stationService', StationService);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImphdmFzY3JpcHQvbWFpbi5qcyIsImphdmFzY3JpcHQvY29tcG9uZW50cy9sZWFmbGV0L2NvbnRyb2xsZXIubGVhZmxldC5qcyIsImphdmFzY3JpcHQvY29tcG9uZW50cy9sZWFmbGV0L2RpcmVjdGl2ZS5sZWFmbGV0LmpzIiwiamF2YXNjcmlwdC9jb21wb25lbnRzL21haW4vY29udHJvbGxlci5tYWluLmpzIiwiamF2YXNjcmlwdC9jb21wb25lbnRzL3N0YXRpb25zL3NlcnZpY2Uuc3RhdGlvbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsSUFBQSxHQUFBLEdBQUEsT0FBQSxDQUFBLE1BQUEsQ0FBQSxRQUFBLEVBQUEsQ0FDQSxZQUFBLENBQ0EsQ0FBQSxDQUFBOztBQUVBLEdBQUEsQ0FBQSxNQUFBLENBQUEsQ0FBQSxzQkFBQSxFQUFBLFVBQUEsb0JBQUEsRUFBQTtBQUNBLHNCQUFBLENBQUEsV0FBQSxDQUFBLElBQUEsQ0FBQSxDQUFBO0FBQ0Esc0JBQUEsQ0FBQSxTQUFBLENBQUEsSUFBQSxDQUFBLENBQUE7Q0FDQSxDQUFBLENBQUEsQ0FBQTs7SUNQQSxpQkFBQTtBQUVBLFdBRkEsaUJBQUEsQ0FFQSxNQUFBLEVBQUE7MEJBRkEsaUJBQUE7O0FBR0EsUUFBQSxDQUFBLE1BQUEsR0FBQSxNQUFBLENBQUE7QUFDQSxRQUFBLENBQUEsR0FBQSxDQUFBO0dBQ0E7O2VBTEEsaUJBQUE7O1dBT0EsY0FBQSxHQUFBLEVBQUE7O0FBRUEsVUFBQSxDQUFBLEdBQUEsR0FBQSxDQUFBLENBQUEsR0FBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLE9BQUEsQ0FBQSxDQUFBLEVBQUEsRUFBQSxDQUFBLEtBQUEsQ0FBQSxFQUFBLENBQUEsQ0FBQSxDQUFBOztBQUVBLFVBQUEsS0FBQSxHQUFBLENBQUEsQ0FBQSxTQUFBLENBQUEsbUVBQUEsQ0FBQSxDQUFBO0FBQ0EsV0FBQSxDQUFBLEtBQUEsQ0FBQSxJQUFBLENBQUEsR0FBQSxDQUFBLENBQUE7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QkFBQSxDQUFBLENBQUE7Q0FDQTs7QUFFQSxjQUFBLENBQUEsT0FBQSxHQUFBLENBQUEsV0FBQSxDQUFBLENBQUE7O0FBRUEsR0FBQSxDQUFBLE9BQUEsQ0FBQSxnQkFBQSxFQUFBLGNBQUEsQ0FBQSxDQUFBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBhcHAgPSBhbmd1bGFyLm1vZHVsZSgnc3RyZWFtJywgW1xuICAnbmdSZXNvdXJjZSdcbl0pO1xuXG5hcHAuY29uZmlnKFsnJGludGVycG9sYXRlUHJvdmlkZXInLCBmdW5jdGlvbigkaW50ZXJwb2xhdGVQcm92aWRlcikge1xuICAgICRpbnRlcnBvbGF0ZVByb3ZpZGVyLnN0YXJ0U3ltYm9sKCcoKCcpO1xuICAgICRpbnRlcnBvbGF0ZVByb3ZpZGVyLmVuZFN5bWJvbCgnKSknKTtcbn1dKTtcbiIsImNsYXNzIExlYWZsZXRDb250cm9sbGVyIHtcblxuICAgIGNvbnN0cnVjdG9yKCRzY29wZSkge1xuICAgICAgdGhpcy4kc2NvcGUgPSAkc2NvcGU7XG4gICAgICB0aGlzLm1hcDtcbiAgICB9XG5cbiAgICBpbml0KGRpdikge1xuICAgICAgLy8gVE9ETyBtb3ZlIHRoZSBsb24vbGF0IHRvIGRpcmVjdGl2ZVxuICAgICAgdGhpcy5tYXAgPSBMLm1hcChkaXYpLnNldFZpZXcoWzM5LCAtMTA1LjVdLCA3KTtcbiAgICAgIC8vIFRPRE8gbW92ZSBtYXAgdGlsZXMgVVJJIHRvIGEgY29uc3RhbnRcbiAgICAgIGxldCBsYXllciA9IEwudGlsZUxheWVyKCdodHRwOi8ve3N9LnRpbGVzLm1hcGJveC5jb20vdjMvdzAwZGJlcnJ5LmpoamNnNWdsL3t6fS97eH0ve3l9LnBuZycpO1xuICAgICAgbGF5ZXIuYWRkVG8odGhpcy5tYXApO1xuICAgICAgdGhpcy5hZGRTdGF0aW9ucygpO1xuICAgIH07XG5cbiAgICBhZGRTdGF0aW9ucygpIHtcbiAgICAgIC8vIFRPRE8gYWRkIG9ubHkgc3RhdGlvbnMgdGhhdCBhcmUgbm90IGN1cnJlbnRseSBhZGRlZCB0byB0aGUgbWFwXG4gICAgICAvLyB1c2luZyB1bmRlcnNjb3JlIHRvIG1vZGlmeSB0aGUgbG9jYWwgc3RhdGlvbnMgdmFyaWFibGUgaGVyZVxuICAgICAgdGhpcy5zdGF0aW9ucy4kcHJvbWlzZS50aGVuKChzdGF0aW9ucykgPT4ge1xuICAgICAgICBzdGF0aW9ucy5mb3JFYWNoKChzdGF0aW9uLCBpbmRleCkgPT4ge1xuICAgICAgICAgIGxldCBtYXJrZXIgPSBMLm1hcmtlcihbc3RhdGlvbi5sYXRpdHVkZSwgc3RhdGlvbi5sb25naXR1ZGVdKTtcbiAgICAgICAgICBtYXJrZXIuc3RhdGlvbklEID0gc3RhdGlvbi5pZDtcbiAgICAgICAgICBtYXJrZXIub24oJ2NsaWNrJywgXy5iaW5kKHRoaXMubWFya2VyQ2xpY2tlZCwgdGhpcykpO1xuICAgICAgICAgIG1hcmtlci5hZGRUbyh0aGlzLm1hcCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIG1hcmtlckNsaWNrZWQoZXZlbnQpIHtcbiAgICAgIHRoaXMuJHNjb3BlLiRlbWl0KCdsZWFmbGV0OjptYXJrZXItY2xpY2tlZCcsIHtcbiAgICAgICAgc3RhdGlvbklEOiBldmVudC50YXJnZXQuc3RhdGlvbklEXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZW1vdmVTdGF0aW9ucygpIHtcbiAgICAgIC8vIFRPRE8gcmVtb3ZlIGFsbCBzdGF0aW9ucyBmcm9tIHRoZSBtYXAgdGhhdCBhcmVuJ3QgaW4gdGhpcy5zdGF0aW9uc1xuICAgIH1cblxuICAgIHVwZGF0ZVN0YXRpb25zKCkge1xuICAgICAgdGhpcy5yZW1vdmVTdGF0aW9ucygpO1xuICAgICAgdGhpcy5hZGRTdGF0aW9ucygpO1xuICAgIH1cblxufVxuXG5MZWFmbGV0Q29udHJvbGxlci4kaW5qZWN0ID0gWyckc2NvcGUnXTtcblxuYXBwLmNvbnRyb2xsZXIoJ2xlYWZsZXRDb250cm9sbGVyJywgTGVhZmxldENvbnRyb2xsZXIpO1xuIiwiZnVuY3Rpb24gbGVhZmxldCgpIHtcbiAgcmV0dXJuIHtcbiAgICBzY29wZToge30sXG4gICAgYmluZFRvQ29udHJvbGxlcjoge1xuICAgICAgc3RhdGlvbnM6ICc9J1xuICAgIH0sXG4gICAgY29udHJvbGxlcjogJ2xlYWZsZXRDb250cm9sbGVyIGFzIGN0cmwnLFxuICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycywgY3RybCl7XG4gICAgICBjdHJsLmluaXQoZWxlbWVudFswXSwgc2NvcGUpO1xuICAgIH1cbiAgfVxufTtcblxuYXBwLmRpcmVjdGl2ZSgnbGVhZmxldCcsIGxlYWZsZXQpO1xuIiwiY2xhc3MgTWFpbkNvbnRyb2xsZXIge1xuXG4gIGNvbnN0cnVjdG9yKCRzY29wZSwgc3RhdGlvblNlcnZpY2UpIHtcbiAgICB0aGlzLiRzY29wZSA9ICRzY29wZTtcblxuICAgICRzY29wZS5zdGF0aW9ucyA9IHN0YXRpb25TZXJ2aWNlLnF1ZXJ5KCk7XG4gICAgJHNjb3BlLnN0YXRpb247XG4gICAgJHNjb3BlLiRvbignbGVhZmxldDo6bWFya2VyLWNsaWNrZWQnLCAoZW1pdCwgbWVzc2FnZSkgPT4ge1xuICAgICAgdGhpcy51cGRhdGVTdGF0aW9uKG1lc3NhZ2Uuc3RhdGlvbklEKTtcbiAgICB9KTtcbiAgfVxuXG4gIHVwZGF0ZVN0YXRpb24oc3RhdGlvbklEKXtcbiAgICB0aGlzLiRzY29wZS5zdGF0aW9uID0gXy5maW5kV2hlcmUodGhpcy4kc2NvcGUuc3RhdGlvbnMsIHtpZDogc3RhdGlvbklEfSk7XG4gICAgdGhpcy4kc2NvcGUuJGFwcGx5KCk7XG4gIH1cblxufVxuXG5NYWluQ29udHJvbGxlci4kaW5qZWN0ID0gWyckc2NvcGUnLCAnc3RhdGlvblNlcnZpY2UnXVxuXG5hcHAuY29udHJvbGxlcignbWFpbkNvbnRyb2xsZXInLCBNYWluQ29udHJvbGxlcik7XG4iLCJmdW5jdGlvbiBTdGF0aW9uU2VydmljZSgkcmVzb3VyY2Upe1xuICByZXR1cm4gJHJlc291cmNlKCcvYXBpL3N0YXRpb25zLzpzdGF0aW9uSUQnKTtcbn1cblxuU3RhdGlvblNlcnZpY2UuJGluamVjdCA9IFsnJHJlc291cmNlJ107XG5cbmFwcC5mYWN0b3J5KCdzdGF0aW9uU2VydmljZScsIFN0YXRpb25TZXJ2aWNlKTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==