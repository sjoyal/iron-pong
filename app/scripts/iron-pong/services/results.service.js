/* global angular Firebase*/
(function(){
  'use strict';

  angular.module('iron-pong')
    // authenticate users
    .factory('Auth', function($firebaseAuth){
      var ref = new Firebase('https://iron-pong-dev.firebaseio.com');
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

    // retrieve a list of players for the cohort
    .factory('Players', function(Auth, $http){
      // var authInfo = Auth.authStatus();
      this.players = [];
      var self = this;
      return {
        retrievePlayers: function(){
          $http.get('api/github/repos/theironyard--orlando/2015--summer--fee/stargazers/stargazers.json')
          // $http.get('https://api.github.com/repos/TheIronYard--Orlando/2015--SUMMER--FEE/stargazers?access_token=' + authInfo.github.accessToken)
          .then(function(response){
            self.players = response.data;
          });
          return self.players;
        }
      }; // END Players return
    })
    ; // END ALL THE THINGS!
})();
