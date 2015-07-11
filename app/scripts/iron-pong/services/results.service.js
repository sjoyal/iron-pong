(function(){
  angular.module('iron-pong')
    .factory('Auth', function(){
      var ref = new Firebase('https://iron-pong.firebaseio.com');
      return
        ref.authWithOAuthPopup('github', function(error, authData){
          remember: "sessionOnly"
        })
    });
})();
