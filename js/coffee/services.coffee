playlist.factory 'dataService', ['$http', ($http) ->
    getASong = () ->
      $http.get('104.236.246.87/playlist/get-a-song/').then (response) ->
        response

    submitTrainingData = (trainingData) ->
      $http.post('104.236.246.87/playlist/build-logistic-model/', trainingData).then (response) ->
        response.data
    {
      "getASong": getASong,
      "submitTrainingData": submitTrainingData
    }
  ]
