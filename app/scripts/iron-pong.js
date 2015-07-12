/* global angular */
(function(){
  'use strict';

  angular.module('iron-pong', ['ngRoute'])

    .config(function($routeProvider){
      $routeProvider.when('/recentresults', {
        templateUrl: 'views/recentresults.html'
        //controller: 'RecentResultsController'
      }) // END $routeProvider recentresults
      .when('/leaderboard', {
        templateUrl: 'views/leaderboard.html'
        // controller: 'LeaderboardController'
      }) // END $routeProvider leaderboard
      .when('/gameresult/:gameresultID', {
        templateUrl: 'views/gameresult.html'
        // controller: 'GameResultController'
      }) // END $routeProvider gameresult
      .when('/player/:playerID', {
        templateUrl: 'views/player.html'
        // controller: 'PlayerController'
      }) // END $routeProvider player
      .when('/submit', {
        templateUrl: 'views/submitgameresult.html',
        controller: 'SubmitController'
      }) // END $routeProvider submitgameresult
      .when('/404', {
        templateUrl: 'views/404.html'
      }) // END $routeProvider 404
      .when('/', {
        redirectTo: '/recentresults'
      }) // END redirectTo leaderboard
      .otherwise('/404');
    }) // END $routeProvider

    .controller('MainController', function($scope, Auth) {
      $scope.logStatus = false;
      $scope.login = function (){
        Auth.ghLogin();
        return $scope.logStatus = true;
      };
      $scope.checkAuth = function(){
        Auth.authStatus();
        console.log($scope.logStatus);
      };
      $scope.logout = function(){
        Auth.ghLogout();
        return $scope.logStatus = false;
      };
    }); // END MainController
})();
