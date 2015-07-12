/* global angular */
(function(){
  'use strict';

  angular.module('iron-pong', ['ui.router'])

    .config(function($stateProvider, $urlRouterProvider){
      $urlRouterProvider.otherwise('/404');

      $stateProvider
        .state('recentresults', {
          url: '/recentresults',
          templateUrl: 'views/recentresults.html'
          //controller: 'RecentResultsController'
        }) // END $stateProvider recentresults
        .state('leaderboard', {
          url: '/leaderboard',
          templateUrl: 'views/leaderboard.html'
          // controller: 'LeaderboardController'
        }) // END $stateProvider leaderboard
        .state('gameresult', {
          url: '/gameresult/:gameresultID',
          templateUrl: 'views/gameresult.html'
          // controller: 'GameResultController'
        }) // END $stateProvider gameresult
        .state('player', {
          url: '/player/:playerID',
          templateUrl: 'views/player.html'
          // controller: 'PlayerController'
        }) // END $stateProvider player
        .state('submit', {
          url: '/submit',
          templateUrl: 'views/submitgameresult.html',
          controller: 'SubmitController'
        }) // END $stateProvider submitgameresult
        .state('404', {
          url: '/404',
          templateUrl: 'views/404.html'
        }) // END $stateProvider 404
        .state('/', {
          url: '/',
          redirectTo: '/recentresults'
        }) // END redirectTo recentresults
    }) // END $stateProvider

    .controller('MainController', function($scope, Auth) {
      $scope.logStatus = false;
      $scope.login = function (){
        Auth.ghLogin();
        $scope.logStatus = true;
      };
      $scope.checkAuth = function(){
        console.log(Auth.authStatus());
      };
      $scope.logout = function(){
        Auth.ghLogout();
        $scope.logStatus = false;
      };
    }); // END MainController
})();
