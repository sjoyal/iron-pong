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
          self.athlete.username = $stateParams.playerID;
          console.log(self.athlete);
        });
    }); // END PlayerPageController
})();
