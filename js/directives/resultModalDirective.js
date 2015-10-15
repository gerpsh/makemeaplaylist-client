(function() {
  playlist.directive('resultModal', function() {
    return {
      restrict: "EA",
      scope: false,
      templateUrl: '/js/directives/partials/result_modal.html'
    };
  });

}).call(this);
