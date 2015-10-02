(function() {
  playlist.factory('dataService', [
    '$http', function($http) {
      var getASong, submitTrainingData;
      getASong = function() {
        return $http.get('104.236.246.87/playlist/get-a-song/').then(function(response) {
          return response;
        });
      };
      submitTrainingData = function(trainingData) {
        return $http.post('104.236.246.87/playlist/build-logistic-model/', trainingData).then(function(response) {
          return response.data;
        });
      };
      return {
        "getASong": getASong,
        "submitTrainingData": submitTrainingData
      };
    }
  ]);

}).call(this);
