/* global angular Firebase */
(function(){
  'use strict';

  angular.module('iron-pong')
    .controller('GameResultController', function ($scope, $firebase, $firebaseArray, $stateParams){

      // pull in specific game result from
      var game = new Firebase('https://iron-pong.firebaseio.com/gameresults/' + $stateParams.gameresultID);
      $scope.result = $firebaseObject(game);
      console.log($scope.result);

    }); // END GameResultController
})();
