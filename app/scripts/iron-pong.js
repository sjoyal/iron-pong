/* global angular */
(function(){
  'use strict';

  angular.module('iron-pong', ['ui.router', 'firebase', 'angularMoment', 'restangular'])

    .config(function($stateProvider, $urlRouterProvider){
      $stateProvider
        .state('recentresults', {
          url: '/recentresults',
          templateUrl: 'views/recentresults.html',
          controller: 'RecentResultsController',
          controllerAs: 'recentresults'
        }) // END $stateProvider recentresults
        .state('leaderboard', {
          url: '/leaderboard',
          templateUrl: 'views/leaderboard.html',
          controller: 'LeaderboardController',
          controllerAs: 'leaderboard'
        }) // END $stateProvider leaderboard
        .state('gameresult', {
          url: '/gameresult/:gameresultID',
          templateUrl: 'views/gameresult.html',
          controller: 'GameResultController',
          controllerAs: 'gameresult'
        }) // END $stateProvider gameresult
        .state('player', {
          url: '/player/:playerID',
          templateUrl: 'views/player.html',
          controller: 'PlayerPageController',
          controllerAs: 'playerPage'
        }) // END $stateProvider player
        .state('submit', {
          url: '/submit',
          templateUrl: 'views/submitgameresult.html',
          controller: 'SubmitController',
          controllerAs: 'submit'
        }) // END $stateProvider submitgameresult
        .state('404', {
          url: '/404',
          templateUrl: 'views/404.html'
        }); // END $stateProvider 404
      $urlRouterProvider
        .otherwise('/recentresults');
       // END redirectTo recentresults
    }) // END $stateProvider .config

    .config(function(RestangularProvider){
      RestangularProvider.setBaseUrl('https://iron-pong.firebaseio.com');
      RestangularProvider.setRequestSuffix('.json');
    })

    .controller('MainController', function($scope, Auth) {
      $scope.auth = Auth.magicAuth;
      $scope.auth.$onAuth(function(authData){
        $scope.authData = authData;
        console.log(authData);
      });
      $scope.login = function (){
        Auth.ghLogin();
      };
      $scope.checkAuth = function(){
        console.log(Auth.authStatus());
      };
      $scope.logout = function(){
        Auth.ghLogout();
      };
    }) // END MainController
  ; // END ALL THE THINGS
})();
