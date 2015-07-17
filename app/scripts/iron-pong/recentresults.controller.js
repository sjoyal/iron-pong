/* global angular Firebase */
(function(){
  'use strict';

  angular.module('iron-pong')
    .controller('RecentResultsController', function($scope, $firebaseArray, $firebase, Restangular){
      // pull in the recent game results from firebase
      this.scores = [ ];
      var self = this;
      // var ref = new Firebase('https://iron-pong.firebaseio.com/gameresults')
      // this.scores = $firebaseArray(ref);
      Restangular.one('gameresults').get()
        .then(function(data){
          self.scores = data.plain();
          console.log(self.scores);
        });
    }); // END RecentResultsController
})();
