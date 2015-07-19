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
    
    ; // END ALL THE THINGS!
})();
