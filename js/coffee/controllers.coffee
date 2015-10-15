playlist.controller 'mainController', ['$scope', 'dataService', ($scope, dataService) ->

  #arithmetic average
  average = (arr) ->
    _.reduce(arr, ((sum, el) -> sum + el), 0)/arr.length

  $scope.playlistLength = 10
  $scope.currentPick = ''
  passPickToScope = (song) ->
    $scope.currentPick = song
    return
  $scope.currentPick = dataService.getASong().then (data) ->
    passPickToScope(data)
    return
  $scope.yesPicks = []
  $scope.noPicks = []
  $scope.testPicks = [
    {"artist": "one", "title": "two"},
    {"artist": "three", "title": "four"},
  ]
  $scope.chartColumns = [
        {"id": "Song Hotness", "type": "bar"},
        {"id": "Artist Hotness", "type": "bar"},
        {"id": "Artist Familiarity", "type": "bar"},
        {"id": "Danceability", "type": "bar"},
        {"id": "Energy", "type": "bar"}]
  $scope.chartDataPoints = [
    {"Song Hotness": 0,
    "Artist Hotness": 0,
    "Artist Familiarity": 0,
    "Danceability": 0,
    "Energy": 0}]

  $scope.averageTempo = 0

  $scope.finalPlaylist = []
  $scope.score = 0

  updateAverages = () ->
    $scope.chartDataPoints = [
      {"Song Hotness": average(_.pluck($scope.yesPicks, 'songHotness')).toFixed(4),
      "Artist Hotness": average(_.pluck($scope.yesPicks, 'artistHotness')).toFixed(4),
      "Artist Familiarity": average(_.pluck($scope.yesPicks, 'artistFamiliarity')).toFixed(4),
      "Danceability": average(_.pluck($scope.yesPicks, 'danceability')).toFixed(4),
      "Energy": average(_.pluck($scope.yesPicks, 'energy')).toFixed(4)}]
    $scope.averageTempo = average(_.pluck($scope.yesPicks, 'tempo')).toFixed(0)
    return

  snd = new Audio()
  $scope.getNewPick = () ->
    snd.pause()
    $scope.currentPick = {}
    dataService.getASong().then (data) ->
      $scope.currentPick = data
      return

  $scope.addToYes = () ->
    $scope.currentPick.include = 1
    $scope.yesPicks.push $scope.currentPick
    $scope.getNewPick()
    updateAverages()
    return

  $scope.addToNo = () ->
    $scope.currentPick.include = 0
    $scope.noPicks.push $scope.currentPick
    $scope.getNewPick()
    return

  #when user says "i don't know"
  $scope.destroyPick = () ->
    $scope.getNewPick()
    return

  $scope.playSong = () ->
    snd.pause();
    file_path = $scope.currentPick.path.split("Media/Music/")[1];
    amended_path = "http://localhost:8090/" + file_path;
    snd = new Audio(amended_path);
    snd.play();
    return

  $scope.jumpAudio = () ->
    snd.currentTime = snd.currentTime + 5;
    return

  #filter out naughty words for demo
  $scope.filterNaughty = (word) ->
    if word
      word.replace /[Ff]uck/, '****'
      word.replace /[Ss]hit/, '****'
      word.replace /[Nn]igga/, '*****'
      word.replace /Porno/, '*****'
      word.replace /[Bb]itch/, '*****'

  $scope.score = 0;
  $scope.submitData = () ->
    fullSet = {}
    fullSet['songs'] = $scope.yesPicks.concat $scope.noPicks
    fullSet['length'] = $scope.playlistLength
    dataService.submitTrainingData(fullSet).then (result) ->
      $scope.finalPlaylist = result.data.songs
      $scope.score = result.data.score
      _.each $scope.finalPlaylist, (d) ->
        return
      return
  return
]
