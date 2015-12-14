app.directive('textDirective', [ function ( ) {
  return {
    restrict: 'E',
    template: "<textarea rows='35' cols='70'>  </textarea>",
    scope: {},
    link: function(scope, element, attr) {

    }
  };
}]);