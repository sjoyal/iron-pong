(function(){
  'use strict';

  angular.module('iron-pong')
    .controller('PlayerPageController', function($scope, $stateParams, Restangular){
      console.log($stateParams);
      this.athlete = {};
      this.athleteDetails = {};
      var self = this;
      Restangular.one('players', $stateParams.playerID).get()
        .then(function(data){
          self.athlete = data.plain();
          self.athlete.pct = (data.wins / data.gamesPlayed) * 100;
          console.log(self.athlete);
        });
    }); // END PlayerPageController
})();
