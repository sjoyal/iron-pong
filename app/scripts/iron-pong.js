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

        .state('login', {
          url: '/login',
          templateUrl: 'views/login.html',
          controller: 'LoginController',
          controllerAs: 'login'
        }) // END $stateProvider login

        .state('404', {
          url: '/404',
          templateUrl: 'views/404.html'
        }); // END $stateProvider 404

      $urlRouterProvider
        .otherwise('/recentresults');
    }) // END $stateProvider .config

    .config(function(RestangularProvider){
      RestangularProvider.setBaseUrl('https://iron-pong.firebaseio.com');
      RestangularProvider.setRequestSuffix('.json');
    })

    .controller('MainController', function(Auth) {
      var self = this;
      this.auth = Auth.magicAuth;
      this.auth.$onAuth(function(authData){
        self.authData = authData;
        console.log(self.authData);
      });
      this.login = function (){
        Auth.ghLogin();
      };
      this.checkAuth = function(){
        console.log(Auth.authStatus());
      };
      this.logout = function(){
        Auth.ghLogout();
      };
      this.collapseMenu = function(){
        $('.navbar-nav li a').click(function(){
          var open = $('.navbar-toggle').is(':visible');
          if (open){
            $('.navbar-collapse').collapse('hide');
          }
        });
      };
    }) // END MainController
  ; // END ALL THE THINGS
})();
