/* global angular */
(function(){
  'use strict';

  angular.module('iron-pong')
    .controller('GameResultController', function ($scope, Delete, Restangular, $state, $stateParams){

      console.log($stateParams);

      // pull in specific game result from
      this.game = {};
      var self = this;
      Restangular.one('gameresults', $stateParams.gameresultID).get()
        .then(function(data){
          self.game = data.plain();
          // console.log(self.game);
        });

      this.deleteGame = function(){
        var winner = self.game.winner.login;
        var loser = self.game.loser.login;
        Restangular.one('gameresults', $stateParams.gameresultID).remove()
          .then(function(){
            // Restangular.one('players', winner).get()
            //   .then(function(gameWinner){
            //     if (gameWinner.gamesPlayed === 1) {
            //       Restangular.one('players', winner).remove();
            //     } else {
            //       Restangular.one('players/' + winner).patch({
            //         wins: (gameWinner.wins - 1),
            //         gamesPlayed: (gameWinner.gamesPlayed - 1)
            //       }).then(function(){
            //         // Remove game reference under player ID
            //       });
            //     }
            //   });
            Delete.resultRemove(winner, 1, 0);
            Delete.resultRemove(loser, 0, 1);
            // Restangular.one('players', loser).get()
            //   .then(function(gameLoser){
            //     if (gameLoser.gamesPlayed === 1) {
            //       Restangular.one('players', loser).remove();
            //     } else {
            //       Restangular.one('players/' + loser).patch({
            //         losses: (gameLoser.losses - 1),
            //         gamesPlayed: (gameLoser.gamesPlayed - 1)
            //       }).then(function(){
            //         // Remove game reference under player ID
            //       });
            //     }
            //   });
          });
        };
    }); // END GameResultController
})();
