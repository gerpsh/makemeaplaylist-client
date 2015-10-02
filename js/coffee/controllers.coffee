playlist.controller 'mainController', ['$scope', 'dataService', ($scope, dataService) ->

  $scope.currentPick = dataService.getASong().then (data) -> return data
  $scope.yesPicks = []
  $scope.noPicks = []

  $scope.getNewPick = () ->
    dataService.getASong().then (data) ->
      $scope.currentPick = data
      $scope.$apply()
      return

  $scope.addToYes = () ->
    $scope.currentPick.data.include = 1
    $scope.yesPicks.push $scope.currentPick
    $scope.getNewPick()
    $scope.$apply()
    return

  $scope.addToNo = () ->
    $scope.currentPick.data.include = 0
    $scope.noPicks.push $scope.currentPick
    $scope.getNewPick()
    $scope.$apply()
    return

  $scope.destroyPick = () ->
    scope.getNewPick()
    $scope.$apply()
    return

  return
]
