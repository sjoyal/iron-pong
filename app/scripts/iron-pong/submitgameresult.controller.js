/* global angular _ */
(function(){
  'use strict';

  angular.module('iron-pong')
    .controller('SubmitController',
      function($state, $http, Auth, Submit, Restangular){

      var self = this;
      this.players = [];
      this.gameresult = {
        winner: '',
        winnerScore: '',
        loser: '',
        loserScore: '',
        summary: '',
        createdOn: ''
      };

      // Retrieve list of stargazers from cohort repo local vs live request:
      this.auth = Auth.magicAuth;
      this.auth.$onAuth(function(authData){
        self.authData = authData;
        if (!self.authData) {
          return;
        }
        /** FIXME: filter mechanism for input fields
          * update to use with only winner / loser fields
          * remove selected winner option from list of loser options
          */
        $http.get('https://api.github.com/repos/TheIronYard--Orlando/2015--SUMMER--FEE/stargazers?access_token='
           + self.authData.github.accessToken)
            .then(function(response){
              self.players = _.forEach(response.data, function(player){
                delete player.id;
                delete player.gravatar_id;
                delete player.url;
                delete player.html_url;
                delete player.followers_url;
                delete player.following_url;
                delete player.gists_url;
                delete player.starred_url;
                delete player.subscriptions_url;
                delete player.organizations_url;
                delete player.repos_url;
                delete player.events_url;
                delete player.received_events_url;
                delete player.type;
                delete player.site_admin;
                return player;
              });
              self.access = _.find(self.players, function(player){
                return player.login === self.authData.github.username;
              });
              // console.log(self.access);
          }); // END $http.get github repo stargazers
      });

      this.addResults = function(){
        var timestamp = new Date().getTime();
        self.gameresult.createdOn = timestamp;
        var winner = self.gameresult.winner.login;
        var winnerPic = self.gameresult.winner.avatar_url;
        var loser = self.gameresult.loser.login;
        var loserPic = self.gameresult.loser.avatar_url;
        Restangular.all('gameresults').post(self.gameresult)
          .then(function(result){
            var jumanji = result.name;
            Restangular.one('players', winner).get()
              .then(function(gameWinner){
                if (!gameWinner) {
                  Submit.newPlayer(winner, winnerPic, jumanji, 1, 0);
                } else {
                  Restangular.one('players/' + winner).patch({
                    login: winner,
                    avatar: winnerPic,
                    wins: (gameWinner.wins + 1),
                    gamesPlayed: (gameWinner.gamesPlayed + 1),
                    losses: gameWinner.losses
                  }).then(function(){
                    Restangular.one('players', winner).post('games', {
                      true: jumanji
                    });
                  });
                }
              });
            Restangular.one('players', loser).get()
              .then(function(gameLoser){
                if (!gameLoser) {
                  Submit.newPlayer(loser, loserPic, jumanji, 0, 1);
                } else {
                  Restangular.one('players/' + loser).patch({
                    login: loser,
                    avatar: loserPic,
                    wins: gameLoser.wins,
                    gamesPlayed: (gameLoser.gamesPlayed + 1),
                    losses: (gameLoser.losses + 1)
                  }).then(function(){
                    Restangular.one('players', loser).post('games', {
                      true: jumanji
                    });
                  });
                }
              });
          });
          self.gameresult = {
            winner: '',
            winnerScore: '',
            loser: '',
            loserScore: '',
            summary: '',
            createdOn: ''
          };
          $state.go('recentresults');
      };
    }); // END SubmitController
})();
