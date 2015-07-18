(function(){
  'use strict';

  angular.module('iron-pong')
    .controller('PlayerPageController', function($http, Auth, $stateParams, Restangular){
      this.athlete = {};
      this.athleteDetails = {};
      var self = this;

      // Request player information from firebase
      Restangular.one('players', $stateParams.playerID).get()
        .then(function(data){
          self.athlete = data.plain();
          self.athlete.pct = (data.wins / data.gamesPlayed) * 100;
          console.log(self.athlete);
        }); // END Restangular request for player info

      // Check auth status and request user info from github
      // for logged in users
      this.auth = Auth.magicAuth;
      this.auth.$onAuth(function(authData){
        self.authData = authData;
        console.log(self.authData);
        if (!authData) return;
        $http.get('https://api.github.com/users/' + $stateParams.playerID)
          .then(function(response){
            self.athleteDetails = response.data;
            console.log(self.athleteDetails);
          });
      }); // END $onAuth and github user .get() request

    }); // END PlayerPageController
})();
