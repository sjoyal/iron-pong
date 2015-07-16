/* global angular Firebase */
(function(){
  'use strict';

  angular.module('iron-pong')
    .controller('GameResultController', function ($scope, $firebase, $firebaseObject, $stateParams){

      // pull in specific game result from
      var game = new Firebase('https://iron-pong-dev.firebaseio.com/gameresults/');
      $scope.result = $firebaseObject(game.child($stateParams.gameresultID));
      console.log($scope.result);

    }); // END GameResultController
})();
