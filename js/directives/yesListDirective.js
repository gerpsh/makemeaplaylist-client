(function() {
  playlist.directive('yesList', function() {
    return {
      restrict: 'EA',
      scope: false,
      templateUrl: "/js/directives/partials/yesList.html"
    };
  });

}).call(this);
