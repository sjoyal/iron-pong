/* global angular */
(function(){
  angular.module('iron-pong')

    .controller('SubmitController', function($scope, $http){
      $scope.players = [ ];
      $scope.competitors = [ ];
      $scope.addPlayer1 = function(playerName){
        $scope.competitors[0] = playerName;
        console.log($scope.competitors);
      };
      $scope.addPlayer2 = function(playerName){
        $scope.competitors[1] = playerName;
        console.log($scope.competitors);
      };
      // Retrieve list of stargazers from cohort repo
      $http.get('api/github/repos/theironyard--orlando/2015--summer--fee/stargazers/stargazers.json')
        .then(function(response){
          $scope.players = response.data;
          console.log($scope.players);
        });
    });


})();
