/* global angular Firebase*/
(function(){
  'use strict';

  angular.module('iron-pong')
    // authenticate users
    .factory('Auth', function($firebaseAuth){
      var ref = new Firebase('https://iron-pong.firebaseio.com');
      return {
        magicAuth: $firebaseAuth(ref),
        ghLogin: function(){
          ref.authWithOAuthPopup('github', function(){
            console.log('hello');
          }, {remember: 'sessionOnly'});
        },
        authStatus: function(){
          return ref.getAuth();
        },
        ghLogout: function(){
          ref.unauth();
          console.log('goodbye');
        }
      }; // END Auth return
    }) // END Auth factory

    .factory('Submit', function(Restangular){
      return {
        newPlayer: function(player, playerPic, game, numWins, numLosses){
          Restangular.one('players/' + player).patch({
            login: player,
            avatar: playerPic,
            wins: numWins,
            gamesPlayed: 1,
            losses: numLosses
          }).then(function(){
            Restangular.one('players', player).post('games', {
            true: game
            });
          });
        },
        updatePlayer: function(player, playerPic, game, wins, losses, gamesPlayed, addWins, addLosses, addGamesPlayed){
          Restangular.one('players/' + player).patch({
            login: player,
            avatar: playerPic,
            wins: (wins + addWins),
            gamesPlayed: (gamesPlayed + addGamesPlayed),
            losses: (losses + addLosses)
          }).then(function(){
            Restangular.one('players', player).post('games', {
              true: game
            });
          });
        }
      };
    })

    .factory('Delete', function(Restangular){
      return true;
    })
    ; // END ALL THE THINGS!
})();
