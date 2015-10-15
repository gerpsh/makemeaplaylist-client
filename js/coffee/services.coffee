playlist.factory 'dataService', ['$http', ($http) ->
    getASong = () ->
      $http.get('http://localhost:8000/playlist/get-a-song/').then (response) ->
        response.data

    submitTrainingData = (trainingData) ->
      $http.post('http://localhost:8000/playlist/build-model/', trainingData).then (response) ->
        response
    {
      "getASong": getASong,
      "submitTrainingData": submitTrainingData
    }
  ]
