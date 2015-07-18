(function(){
  'use strict';

  angular.module('iron-pong')
    .controller('PlayerPageController', function($scope, $stateParams, Restangular){
      console.log($stateParams);
    }); // END PlayerPageController
})();
