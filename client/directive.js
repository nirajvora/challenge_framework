app.directive('textDirective', ['CodeFactory', function ( CodeFactory ) {
  // This directive is for the text area it is designed to handle all user input  and initialize any DOM manipulation triggered by the user

  return {
    restrict: 'E',
    template: "<textarea rows='25' cols='60'>  </textarea>",
    scope: {}, //The scope is private to not interfere with the PageController (not that it particularly matters in this case)
    link: function(scope, element, attr) {
      var textarea = element.find("textarea");

      // after every key stroke, send all of the user input to the CodeFactory to be parsed
      textarea.bind('input', function ( event ) {
        var userInput = textarea[0].value;
        CodeFactory.parse(userInput);
      });
    }
  };

}]);