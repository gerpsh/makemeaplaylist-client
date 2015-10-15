(function() {
  playlist.directive('noList', function() {
    return {
      restrict: 'EA',
      scope: false,
      templateUrl: "/js/directives/partials/noList.html"
    };
  });

}).call(this);
