(function() {
  playlist.directive('yesListDirective', function() {
    return {
      restrict: 'EA',
      scope: false,
      templateUrl: "partials/yesList.html"
    };
  });

}).call(this);
