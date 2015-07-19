/* global angular */
(function(){
  'use strict';

  angular.module('iron-pong')
    .controller('GameResultController', function ($scope, Comments,
      Auth, Delete, Restangular, $state, $stateParams){

      this.auth = Auth.magicAuth;
      this.auth.$onAuth(function(authData){
        self.authData = authData;
        console.log(self.authData);
      });

      // pull in specific game result from
      this.game = {};
      var self = this;
      Restangular.one('gameresults', $stateParams.gameresultID).get()
        .then(function(data){
          self.game = data.plain();
          console.log(self.game);
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
            Delete.resultRemove(loser, 0, 1);
          });
        };

      this.comment = {
        comment: '',
        author: '',
        avatar: ''
      };

      this.submitComment = function(){
        self.comment.author = self.authData.github.username;
        self.comment.avatar = self.authData.github.profileImageURL;
        Comments.new(self.comment, $stateParams.gameresultID);
        self.comment = {};
      };

      this.deleteComment = function(comment){
        Restangular.one('gameresults', $stateParams.gameresultID)
          .one('comments', comment).remove().then(function(){
            // deleted
          });
        console.log("hello");
        // Restangular.one('gameresults', $stateParams.gameresultID).get()
        //   .then(function(updatedData){
        //     self.game = updatedData.plain();
        //   });
      };

    }); // END GameResultController
})();
