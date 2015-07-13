/* global angular _*/
(function(){
  angular.module('iron-pong')

    .controller('SubmitController', function($scope, $http, Auth, Players, $firebaseArray, $state){
      // $scope.players = Players.retrievePlayers();
      $scope.players = [];

      // Retrieve list of stargazers from cohort repo
      // $scope.authInfo = Auth.authStatus();
      $http.get('api/github/repos/theironyard--orlando/2015--summer--fee/stargazers/stargazers.json')
      // $http.get('https://api.github.com/repos/TheIronYard--Orlando/2015--SUMMER--FEE/stargazers?access_token=' + $scope.authInfo.github.accessToken)
        .then(function(response){
          $scope.players = _.forEach(response.data, function(player){
            var data = player
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
          });
          console.log($scope.players);
        }); // END $http.get github repo stargazers
      // $scope.results = [ ];
      $scope.gameresult = {
        winner: '',
        winnerScore: '',
        loser: '',
        loserScore: '',
        summary: ''
        // created: moment()
      };
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
      // };
      $scope.deleteResult = function(index){
        $scope.results.splice(index, 1);
      };
      var ref = new Firebase('https://iron-pong.firebaseio.com');
      $scope.results = $firebaseArray(ref);
      $scope.submitResults = function(){
        $scope.results.$add($scope.gameresult);
        $scope.gameresult = {winner:'',winnerScore:'',loser:'',loserScore:'',summary:''};
        // $state.go('recentresults');
      };
    });
})();







// $scope.competitors = [ ];
// $scope.addPlayer1 = function(playerName){
//   $scope.competitors[0] = playerName;
//   console.log($scope.competitors);
// };
// $scope.addPlayer2 = function(playerName){
//   $scope.competitors[1] = playerName;
//   console.log($scope.competitors);
// };
