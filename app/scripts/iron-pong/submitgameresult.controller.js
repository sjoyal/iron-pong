/* global angular _ Firebase*/
(function(){
  'use strict';

  angular.module('iron-pong')
    .controller('SubmitController',
      function($scope, $http, Auth, $firebase, Players, $firebaseArray){

      // $scope.players = Players.retrievePlayers();
      $scope.players = [];

      // $scope.auth = Auth.magicAuth;
      // $scope.auth.$onAuth(function(authData){
      //   $scope.authData = authData;
      // });

      // Retrieve list of stargazers from cohort repo local vs live request:
      $http.get('api/github/repos/theironyard--orlando/2015--summer--fee/stargazers/stargazers.json')
      // $http.get('https://api.github.com/repos/TheIronYard--Orlando/2015--SUMMER--FEE/stargazers?access_token='
      //  + $scope.authData.github.accessToken)

        .then(function(response){
          $scope.players = _.forEach(response.data, function(player){
            var data = player;
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
            return data;
          }); // console.log($scope.players);
        }); // END $http.get github repo stargazers

      $scope.gameresult = {
        winner: '',
        winnerScore: '',
        loser: '',
        loserScore: '',
        summary: '',
        created_on: ''
      };

  /** results array and add / delete functions
    * used for local storage of data;
    * prior to submission to Firebase
    */
      // $scope.results = [ ];
      // $scope.submitResults = function(){
      //   $scope.results.push($scope.gameresult);
      //   $scope.gameresult = {
      //     winner: '',
      //     winnerScore: '',
      //     loser: '',
      //     loserScore: '',
      //     summary: '',
      //     created: moment()
      //   }
      // };  END submit function for local viewing
      // $scope.deleteResult = function(index){
      //   $scope.results.splice(index, 1);
      // };  END submit function for local deletion

      var games = new Firebase('https://iron-pong.firebaseio.com/gameresults');
      $scope.results = $firebaseArray(games);

      // adding a result to database
      $scope.submitResults = function(){
        var timestamp = new Date().getTime();
        $scope.gameresult.created_on = timestamp;
        console.log($scope.gameresult);
        $scope.results.$add($scope.gameresult);
        $scope.gameresult = { winner: '', winnerScore: '', loser: '', loserScore: '', summary: '', created_on: '' };
        // $state.go('recentresults'); Must add $state as dependency for this to work
      };

      // adding results to individual players
      $scope.submitPlayers = function(){
        var playerWin = new Firebase('https://iron-pong.firebaseio.com/players/' + $scope.gameresult.winner.login);
        this.dbPlayersWin = $firebaseArray(playerWin);
        var playerLose = new Firebase('https://iron-pong.firebaseio.com/players/' + $scope.gameresult.loser.login);
        this.dbPlayersLose = $firebaseArray(playerLose);
        $scope.dbPlayersWin.$add($scope.gameresult);
        $scope.dbPlayersLose.$add($scope.gameresult);
      };

    }); // END SubmitController
})();

/** FIXME: previous filter mechanism for input fields
  * update to use with only winner / loser fields
  * remove selected winner option from list of loser options
  */
// $scope.competitors = [ ];
// $scope.addPlayer1 = function(playerName){
//   $scope.competitors[0] = playerName;
//   console.log($scope.competitors);
// };
// $scope.addPlayer2 = function(playerName){
//   $scope.competitors[1] = playerName;
//   console.log($scope.competitors);
// };
