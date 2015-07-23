/* global angular Firebase */
(function(){
  'use strict';

  angular.module('iron-pong')
    .controller('GameResultController', function ($scope, Comments,
      Auth, Delete, Restangular, $firebaseObject, $state, $stateParams){

      var self = this;
      this.auth = Auth.magicAuth;
      this.auth.$onAuth(function(authData){
        self.authData = authData;
        console.log(self.authData);
      });

      // pull in specific game result from
      this.game = [];
      var ref = new Firebase('https://iron-pong.firebaseio.com/gameresults/' + $stateParams.gameresultID);
      this.game = $firebaseObject(ref);
      console.log(self.game);

      this.deleteGame = function(){
        var winner = self.game.winner;
        var loser = self.game.loser;
        Restangular.one('gameresults', $stateParams.gameresultID).remove()
          .then(function(){
            Delete.resultRemove(winner, 1, 0);
            Delete.resultRemove(loser, 0, 1);
          });
        };

      this.comment = {
        comment: '',
        author: '',
        avatar: ''
      };

      this.submitComment = function(){
        var timestamp = new Date().getTime();
        self.comment.createdOn = timestamp;
        self.comment.author = self.authData.github.username;
        self.comment.avatar = self.authData.github.profileImageURL;
        Comments.new(self.comment, $stateParams.gameresultID);
        self.comment = {};
      };

      this.deleteComment = function(comment){
        Restangular.one('gameresults', $stateParams.gameresultID)
          .one('comments', comment).remove().then(function(){
            // console.log('hello');
        });
      };
    }); // END GameResultController
})();
