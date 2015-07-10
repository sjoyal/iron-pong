/* global angular */
(function(){
  angular.module('iron-pong')

    .controller('SubmitController', function($scope, $http){
      $scope.players = [ ];
      // Retrieve list of stargazers from cohort repo
      $http.get('api/github/repos/theironyard--orlando/2015--summer--fee/stargazers/stargazers.json')
        .then(function(response){
          players = response.data;
          console.log(players[0].login);
        });
    });


})();
