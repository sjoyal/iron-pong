/* global angular */
(function(){
  'use strict';

  angular.module('iron-pong')
    .controller('GameResultController', function ($scope, Restangular, $state, $stateParams){

      console.log($stateParams);
      // pull in specific game result from
      // var game = new Firebase('https://iron-pong.firebaseio.com/gameresults/');
      // $scope.result = $firebaseObject(game.child($stateParams.gameresultID));
      this.game = {};
      var self = this;
      Restangular.one('gameresults', $stateParams.gameresultID).get()
        .then(function(data){
          self.game = data.plain();
          console.log(self.game);
        });

      this.deleteGame = function(){
        Restangular.one('gameresults', $stateParams.gameresultID).remove()
          .then(function(){
            Restangular.one('players', self.game.winner.login).get()
              .then(function(gameWinner){
                if (gameWinner.gamesPlayed === 1) {
                  Restangular.one('players', self.game.winner.login).remove();
                } else {
                  Restangular.one('players/' + self.game.winner.login).patch({
                    wins: (gameWinner.wins - 1),
                    gamesPlayed: (gameWinner.gamesPlayed - 1)
                  }).then(function(){
                    // Remove game reference under player ID
                  });
                }
              });
            Restangular.one('players', self.game.loser.login).get()
              .then(function(gameLoser){
                if (gameLoser.gamesPlayed === 1) {
                  Restangular.one('players', self.game.loser.login).remove();
                } else {
                  Restangular.one('players/' + self.game.loser.login).patch({
                    losses: (gameLoser.losses - 1),
                    gamesPlayed: (gameLoser.gamesPlayed - 1)
                  }).then(function(){
                    // Remove game reference under player ID
                  });
                }
              });
          });
        };
    }); // END GameResultController
})();
