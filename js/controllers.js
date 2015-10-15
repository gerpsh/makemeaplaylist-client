(function() {
  playlist.controller('mainController', [
    '$scope', 'dataService', function($scope, dataService) {
      var average, passPickToScope, snd, updateAverages;
      average = function(arr) {
        return _.reduce(arr, (function(sum, el) {
          return sum + el;
        }), 0) / arr.length;
      };
      $scope.playlistLength = 10;
      $scope.currentPick = '';
      passPickToScope = function(song) {
        $scope.currentPick = song;
      };
      $scope.currentPick = dataService.getASong().then(function(data) {
        passPickToScope(data);
      });
      $scope.yesPicks = [];
      $scope.noPicks = [];
      $scope.testPicks = [
        {
          "artist": "one",
          "title": "two"
        }, {
          "artist": "three",
          "title": "four"
        }
      ];
      $scope.chartColumns = [
        {
          "id": "Song Hotness",
          "type": "bar"
        }, {
          "id": "Artist Hotness",
          "type": "bar"
        }, {
          "id": "Artist Familiarity",
          "type": "bar"
        }, {
          "id": "Danceability",
          "type": "bar"
        }, {
          "id": "Energy",
          "type": "bar"
        }
      ];
      $scope.chartDataPoints = [
        {
          "Song Hotness": 0,
          "Artist Hotness": 0,
          "Artist Familiarity": 0,
          "Danceability": 0,
          "Energy": 0
        }
      ];
      $scope.averageTempo = 0;
      $scope.finalPlaylist = [];
      $scope.score = 0;
      updateAverages = function() {
        $scope.chartDataPoints = [
          {
            "Song Hotness": average(_.pluck($scope.yesPicks, 'songHotness')).toFixed(4),
            "Artist Hotness": average(_.pluck($scope.yesPicks, 'artistHotness')).toFixed(4),
            "Artist Familiarity": average(_.pluck($scope.yesPicks, 'artistFamiliarity')).toFixed(4),
            "Danceability": average(_.pluck($scope.yesPicks, 'danceability')).toFixed(4),
            "Energy": average(_.pluck($scope.yesPicks, 'energy')).toFixed(4)
          }
        ];
        $scope.averageTempo = average(_.pluck($scope.yesPicks, 'tempo')).toFixed(0);
      };
      snd = new Audio();
      $scope.getNewPick = function() {
        snd.pause();
        $scope.currentPick = {};
        return dataService.getASong().then(function(data) {
          $scope.currentPick = data;
        });
      };
      $scope.addToYes = function() {
        $scope.currentPick.include = 1;
        $scope.yesPicks.push($scope.currentPick);
        $scope.getNewPick();
        updateAverages();
      };
      $scope.addToNo = function() {
        $scope.currentPick.include = 0;
        $scope.noPicks.push($scope.currentPick);
        $scope.getNewPick();
      };
      $scope.destroyPick = function() {
        $scope.getNewPick();
      };
      $scope.playSong = function() {
        var amended_path, file_path;
        snd.pause();
        file_path = $scope.currentPick.path.split("Media/Music/")[1];
        amended_path = "http://localhost:8090/" + file_path;
        snd = new Audio(amended_path);
        snd.play();
      };
      $scope.jumpAudio = function() {
        snd.currentTime = snd.currentTime + 5;
      };
      $scope.filterNaughty = function(word) {
        if (word) {
          word.replace(/[Ff]uck/, '****');
          word.replace(/[Ss]hit/, '****');
          word.replace(/[Nn]igga/, '*****');
          word.replace(/Porno/, '*****');
          return word.replace(/[Bb]itch/, '*****');
        }
      };
      $scope.score = 0;
      $scope.submitData = function() {
        var fullSet;
        fullSet = {};
        fullSet['songs'] = $scope.yesPicks.concat($scope.noPicks);
        fullSet['length'] = $scope.playlistLength;
        return dataService.submitTrainingData(fullSet).then(function(result) {
          $scope.finalPlaylist = result.data.songs;
          $scope.score = result.data.score;
          _.each($scope.finalPlaylist, function(d) {});
        });
      };
    }
  ]);

}).call(this);
