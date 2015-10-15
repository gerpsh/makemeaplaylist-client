(function() {
  playlist.directive('outputList', function() {
    return {
      restrict: "EA",
      scope: false,
      templateUrl: '/js/directives/partials/outputList.html'
    };
  });

}).call(this);
