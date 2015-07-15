/* global angular Firebase _*/
(function(){
  'use strict';

  angular.module('iron-pong')
    .controller('LeaderboardController',
      function($scope, $http, $filter, $firebase, $firebaseArray, ngTableParams){

        var ref = new Firebase('https://iron-pong.firebaseio.com/players');
        $scope.leaderboard = $firebaseArray(ref);
        $scope.leaderboard.$loaded().then(function(players) {
          _.forEach(players, function(player){
            var playerName = player.$id;
            player.gamesPlayed = _.size(player.games);
            player.gamesWon = _.filter(player.games, function(game){
              return game.winner.login === playerName;
            });
            player.gamesWonLength = player.gamesWon.length;
            player.gamesLost = _.filter(player.games, function(game){
              return game.loser.login === playerName;
            });
            player.gamesLostLength = player.gamesLost.length;
            player.pct = (player.gamesWonLength / player.gamesPlayed) * 100;
            player.avatarUrl = _.map(player.games, function(game){
              if (game.winner.login === playerName) {
                return game.winner.avatar_url;
              } else {
                return game.loser.avatar_url;
              }
            });
          });
          console.log(players);
        });

      // FIXME: Pull and munge data for live stuff in the leaderboardz
        // $scope.players = [
        //   {avatar_url: 'http://lorempixel.com/120/120/people/1', login: 'sjoyal',
        //   wins: 55, losses: 14, pct: .757, games: 69},
        //   {avatar_url: 'http://lorempixel.com/120/120/people/2', login: 'pcreglow',
        //   wins: 40, losses: 30, pct: .568, games: 70},
        //   {avatar_url: 'http://lorempixel.com/120/120/people/3', login: 'jorgehjr84',
        //   wins: 8, losses: 40, pct: .213, games: 48},
        //   {avatar_url: 'http://lorempixel.com/120/120/people/5', login: 'gatorpazz',
        //   wins: 0, losses: 0, pct: .000, games: 0},
        //   {avatar_url: 'http://lorempixel.com/120/120/people/6', login: 'jessyriordan',
        //   wins: 0, losses: 0, pct: .000, games: 0},
        //   {avatar_url: 'http://lorempixel.com/120/120/people/7', login: 'mstaehling',
        //   wins: 0, losses: 0, pct: .000, games: 0},
        //   {avatar_url: 'http://lorempixel.com/120/120/people/4', login: 'al-the-x',
        //   wins: 0, losses: 125, pct: .000, games: 125}
        // ] // END players

        $scope.tableParams = new ngTableParams({
          sorting: {
            wins: 'desc'  // initial sorting
          }
        }, {
          getData: function($defer, params){
            $scope.players = $filter('orderBy')($scope.players, params.orderBy());
              $defer.resolve($scope.players);
          }
        });
      }); // END LeaderboardController


})();
