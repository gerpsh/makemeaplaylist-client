(function() {
  playlist.directive('pick', function() {
    return {
      restrict: "EA",
      scope: false,
      templateUrl: '/js/directives/partials/pick.html'
    };
  });

}).call(this);
