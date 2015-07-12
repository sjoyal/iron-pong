(function(){
  angular.module('iron-pong')
    .factory('Auth', function(){
      var ref = new Firebase('https://iron-pong.firebaseio.com');
      var userSession = this;
      this.authenticated = false;
      return {
        ghLogin: function(){
          ref.authWithOAuthPopup('github', function(error, authData){
            console.log('hello');
            userSession.authenticated = true;
            }, {remember: 'sessionOnly'})
        },
        authStatus: function(){
          return ref.getAuth();
          // console.log(ref.getAuth());
        },
        ghLogout: function(){
          ref.unauth();
          userSession.authenticated = false;
          console.log('goodbye');
        }
      };
    });
})();
