/* global angular */
(function(){
  'use strict';

  angular.module('iron-pong', ['ngRoute'])

    .config(function($routeProvider){
      $routeProvider.when('/leaderboard', {
        templateUrl: 'views/leaderboard.html'
        // controller: 'LeaderboardController'
      }) // END $routeProvider leaderboard
      .when('/gameresults/:gameresultID', {
        templateUrl: 'views/gameresults.html'
        // controller: 'GameResultController'
      }) // END $routeProvider gameresults
      .when('/submit', {
        templateUrl: 'views/submitgameresult.html',
        controller: 'SubmitController'
      }) // END $routeProvider submitgameresult
      .when('/404', {
        templateUrl: 'views/404.html'
      }) // END $routeProvider 404
      .when('/', {
        redirectTo: '/leaderboard'
      }) // END redirectTo leaderboard
      .otherwise('/404');
    }) // END $routeProvider

    .controller('MainController', function() {
      console.log('controller yo');
    }); // END MainController
})();
