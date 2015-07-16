/* global angular Firebase */
(function(){
  'use strict';

  angular.module('iron-pong')
    .controller('RecentResultsController', function($scope, Restangular){
      // pull in the recent game results from firebase
      this.scores = [ ];
      var self = this;
      Restangular.one('gameresults').get()
        .then(function(data){
          _.forEach(data.plain(), function(score){
            self.scores.push(score);
          });
        });
    }); // END RecentResultsController
})();
