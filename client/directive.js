app.directive('textDirective', ['CodeFactory', function ( CodeFactory ) {
  return {
    restrict: 'E',
    template: "<textarea rows='35' cols='70'>  </textarea>",
    scope: {},
    link: function(scope, element, attr) {
      var textarea = element.find("textarea");
      textarea.bind('input', function ( event ) {
        var userInput = textarea[0].value;
        CodeFactory.parse(userInput);
      });
    }
  };
}]);