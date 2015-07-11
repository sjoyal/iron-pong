(function(){
  angular.module('iron-pong')
    .factory('Auth', function(){
      var ref = new Firebase('https://iron-pong.firebaseio.com');
      return {
        ghLogin: function(){
          ref.authWithOAuthPopup('github', function(error, authData){
            console.log(authData)
            }, {remember: 'sessionOnly'})
          },
        authStatus: function(){
          ref.getAuth();
        }
      };
    });
})();
