(function() {
  playlist.directive('noListDirective', function() {
    return {
      restrict: 'EA',
      scope: false,
      templateUrl: "partials/noList.html"
    };
  });

}).call(this);
