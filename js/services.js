(function() {
  playlist.factory('dataService', [
    '$http', function($http) {
      var getASong, submitTrainingData;
      getASong = function() {
        return $http.get('http://localhost:8000/playlist/get-a-song/').then(function(response) {
          return response.data;
        });
      };
      submitTrainingData = function(trainingData) {
        return $http.post('http://localhost:8000/playlist/build-model/', trainingData).then(function(response) {
          return response;
        });
      };
      return {
        "getASong": getASong,
        "submitTrainingData": submitTrainingData
      };
    }
  ]);

}).call(this);
