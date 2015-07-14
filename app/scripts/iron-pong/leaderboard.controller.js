/* global angular Firebase */
(function(){
  'use strict';

  angular.module('iron-pong')
    .controller('LeaderboardController', function($scope, $firebase, $firebaseArray){

      $scope.players: [
        {avatar_url: 'http://lorempixel.com/120/120/people/1', login: 'sjoyal',
        wins: '55', losses: '14', pct: '.757', games: '69'},
        {avatar_url: 'http://lorempixel.com/120/120/people/2', login: 'pcreglow',
        wins: '40', losses: '30', pct: '.568', games: '70'},
        {avatar_url: 'http://lorempixel.com/120/120/people/3', login: 'jorgehjr84',
        wins: '8', losses: '40', pct: '.213', games: '48'},
        {avatar_url: 'http://lorempixel.com/120/120/people/4', login: 'al-the-x',
        wins: '0', losses: '125', pct: '.000', games: '125'},
        {avatar_url: 'http://lorempixel.com/120/120/people/5', login: 'gatorpazz',
        wins: '0', losses: '0', pct: '.000', games: '0'},
        {avatar_url: 'http://lorempixel.com/120/120/people/6', login: 'jessyriordan',
        wins: '0', losses: '0', pct: '.000', games: '0'},
        {avatar_url: 'http://lorempixel.com/120/120/people/7', login: 'mstaehling',
        wins: '0', losses: '0', pct: '.000', games: '0'}
      ] // END $scope.players

      console.log($scope.players);
    }); // END LeaderboardController


})();
