/* global angular _*/
(function(){
  'use strict';

  angular.module('iron-pong')
    .controller('LeaderboardController',
      function($scope, $http, $firebase, $firebaseArray, Restangular){

        this.playerStats = [ ];
        console.log(this.playerStats);
        var self = this;
        Restangular.one('players').get()
          .then(function(data){
            if (!data) {
              return;
            } else {
              _.forEach(data.plain(), function(player){
                self.playerStats.push(player);
              });
            }
            _.forEach(self.playerStats, function(player){
              player.pct = ((player.wins / player.gamesPlayed) * 100);
            });
            console.log(self.playerStats);
          });

        this.tab = 1;
        this.selectTab = function(setTab){
          this.tab = setTab;
        };
        this.isSelected = function(checkTab){
          return this.tab === checkTab;
        };
      }); // END LeaderboardController
})();
