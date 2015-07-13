/* global angular */
(function(){
  angular.module('iron-pong')

    .controller('SubmitController', function($scope, $http, Auth, Players){
      $scope.players = Players.retrievePlayers();
      // $scope.competitors = [ ];
      // $scope.addPlayer1 = function(playerName){
      //   $scope.competitors[0] = playerName;
      //   console.log($scope.competitors);
      // };
      // $scope.addPlayer2 = function(playerName){
      //   $scope.competitors[1] = playerName;
      //   console.log($scope.competitors);
      // };
      // Retrieve list of stargazers from cohort repo
      // $scope.authInfo = Auth.authStatus();
      // $http.get('api/github/repos/theironyard--orlando/2015--summer--fee/stargazers/stargazers.json')
      // // $http.get('https://api.github.com/repos/TheIronYard--Orlando/2015--SUMMER--FEE/stargazers?access_token=' + $scope.authInfo.github.accessToken)
      //   .then(function(response){
      //     $scope.players = response.data;
      //     console.log($scope.players);
      //   });
      $scope.gameresult = {
        winner: '',
        winnerScore: '',
        loser: '',
        loserScore: '',
        summary: '',
        created: ''
      };
      $scope.results = [ ];
    });
})();
