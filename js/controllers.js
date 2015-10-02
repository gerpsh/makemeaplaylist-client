(function() {
  playlist.controller('mainController', [
    '$scope', 'dataService', function($scope, dataService) {
      $scope.currentPick = dataService.getASong().then(function(data) {
        return data;
      });
      $scope.yesPicks = [];
      $scope.noPicks = [];
      $scope.getNewPick = function() {
        return dataService.getASong().then(function(data) {
          $scope.currentPick = data;
          $scope.$apply();
        });
      };
      $scope.addToYes = function() {
        pick.data.include = 1;
        $scope.yesPicks.push(pick);
        $scope.getNewPick();
        $scope.$apply();
      };
      $scope.addToNo = function() {
        pick.data.include = 0;
        $scope.noPicks.push($scope.currentPick);
        $scope.getNewPick();
        $scope.$apply();
      };
      $scope.destroyPick = function(pick) {
        scope.getNewPick();
        $scope.$apply();
      };
    }
  ]);

}).call(this);
