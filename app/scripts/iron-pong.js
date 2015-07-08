(function(){

  angular.module('iron-pong', ['ngRoute'])

    .config(function($routeProvider){
      $routeProvider.when('/leaderboard', {
        templateUrl: 'views/leaderboard.html',
        // controller: 'LeaderboardController',
        // controllerAs: 'leaderboard'
      }); // END $routeProvider leaderboard

      $routeProvider.when('/gameresults/:gameresult', {
        templateUrl: 'views/gameresults.html',
        // controller: 'GameResultController',
        // controllerAs: 'gameresult'
      }); // END $routeProvider gameresults

      $routeProvider.when('/submit', {
        templateUrl: 'views/submitgameresult.html',
        // controller: 'SubmitGameResutController',
        // controllerAs: 'submitgameresult'
      }); // END $routeProvider submitgameresult

      $routeProvider.when('/', {
        redirectTo: '/leaderboard'
      }); // END redirecTo leaderboard

      $routeProvider.otherwise('/404', {
        templateUrl: 'views/404.html'
      });
    }); // END otherwise 404

    .controller('MainController', function($scope) {

    }); // END MainController
})();
