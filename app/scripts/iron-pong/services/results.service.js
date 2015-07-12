(function(){
  angular.module('iron-pong')
    .factory('Auth', function(){
      var ref = new Firebase('https://iron-pong.firebaseio.com');
      return {
        ghLogin: function(){
          ref.authWithOAuthPopup('github', function(error, authData){
            console.log('hello');
            }, {remember: 'sessionOnly'})
        },
        authStatus: function(){
          ref.getAuth();
          console.log(ref.getAuth());
        },
        ghLogout: function(){
          ref.unauth();
          console.log('goodbye');
        }
      };
    });
})();
