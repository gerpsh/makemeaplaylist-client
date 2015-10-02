(function() {
  playlist.directive('pick', function() {
    return {
      restrict: "EA",
      scope: false,
      templateUrl: 'partials/pick.html'
    };
  });

}).call(this);
