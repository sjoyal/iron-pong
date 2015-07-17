/* global angular Firebase */
(function(){
  'use strict';

  angular.module('iron-pong')
    .controller('GameResultController', function ($scope, $firebase, $firebaseObject, Restangular, $stateParams){

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
          .then(function(data){
            Restangular.one('players', self.game.winner.login).get()
              .then(function(data){
                if (data.gamesPlayed === 1) {
                  Restangular.one('players', self.game.winner.login).remove();
                } else {
                  Restangular.one('players/' + self.game.winner.login).patch({
                    wins: (data.wins - 1),
                    gamesPlayed: (data.gamesPlayed - 1)
                  }).then(function(data){
                    // Restangular.one('players', winner).post('games', {jumanji});
                  })
                }

            });
          });
        };

    }); // END GameResultController
})();
