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
          return ref.getAuth();
        },
        ghLogout: function(){
          ref.unauth();
          console.log('goodbye');
        }
      } // END 'Auth' return
    }) // END Auth factory
    .factory('Players', function(Auth, $http){
      var authInfo = Auth.authStatus();
      this.players = [];
      var self = this;
      return {
        retrievePlayers: function(){
          $http.get('api/github/repos/theironyard--orlando/2015--summer--fee/stargazers/stargazers.json')
          // $http.get('https://api.github.com/repos/TheIronYard--Orlando/2015--SUMMER--FEE/stargazers?access_token=' + $scope.authInfo.github.accessToken)
          .then(function(response){
            self.players = response.data;
          });
          return self.players;
        }
      }
    })
    ; // END ALL THE THINGS!
})();
