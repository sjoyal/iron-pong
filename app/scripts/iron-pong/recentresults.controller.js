/* global angular Firebase */
(function(){
  'use strict';

  angular.module('iron-pong')
    .controller('RecentResultsController', function($scope, $firebase, $firebaseArray){

      // pull in the recent game results from firebase
      var games = new Firebase('https://iron-pong-dev.firebaseio.com/gameresults');
      $scope.results = $firebaseArray(games);
      console.log($scope.results);

    }); // END RecentResultsController
})();
