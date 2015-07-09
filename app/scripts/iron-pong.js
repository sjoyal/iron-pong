/* global angular */
(function(){
  'use strict';

  angular.module('iron-pong', ['ngRoute'])

    .config(function($routeProvider){
      $routeProvider.when('/leaderboard', {
        templateUrl: 'views/leaderboard.html'
        // controller: 'LeaderboardController',
        // controllerAs: 'leaderboard'
      }); // END $routeProvider leaderboard

      $routeProvider.when('/gameresults/:gameresultID', {
        templateUrl: 'views/gameresults.html'
        // controller: 'GameResultController',
        // controllerAs: 'gameresult'
      }); // END $routeProvider gameresults

      $routeProvider.when('/submit', {
        templateUrl: 'views/submitgameresult.html'
        // controller: 'SubmitGameResutController',
        // controllerAs: 'submitgameresult'
      }); // END $routeProvider submitgameresult

      $routeProvider.when('/404', {
        templateUrl: 'views/404.html'
      });

      $routeProvider.when('/', {
        redirectTo: '/leaderboard'
      }); // END redirecTo leaderboard

      $routeProvider.otherwise('/404');
    })

    .controller('MainController', function() {

    }); // END MainController
})();
