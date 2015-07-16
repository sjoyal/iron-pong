/* global angular Firebase */
(function(){
  'use strict';

  angular.module('iron-pong')
    .controller('RecentResultsController', function($scope, $firebaseArray, $firebase, Restangular){
      // pull in the recent game results from firebase
      var self = this;
      var ref = new Firebase('https://iron-pong.firebaseio.com/gameresults')
      this.scores = $firebaseArray(ref);
      console.log(self.scores);
    }); // END RecentResultsController
})();
