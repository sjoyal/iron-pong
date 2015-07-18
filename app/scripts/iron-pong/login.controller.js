(function(){
  'use strict';

  angular.module('iron-pong')
    .controller('LoginController', function(Auth, $state){

      this.auth = Auth.magicAuth;
      var self = this;

      this.authenticate = function(){
        Auth.ghLogin();
      };

      this.auth.$onAuth(function(authData){
        self.authData = authData;
        console.log(authData);
        if (!authData) return;
        $state.go('submit');
      });
    }); // END LoginController
})();
