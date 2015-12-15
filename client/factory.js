app.factory('CodeFactory', [ '$rootScope', function ( $rootScope ) { // This factory handles all user input code
  
  // parses the user input and triggers an update event to the rest of the application
  var parse = function( string ) {
    var object = acorn.parse(string); //acorn's code parser returns a node tree of the users code as an object

    var array = [];
    var typeLog = {};

    (function walk( node, prevNode ) { //helper function to walk through acorn's object and give me the information I want in the form I want to display it in
      var expression;
      if(prevNode === null || prevNode === 'Program') {
        expression = node.type;
      } else {
        expression = node.type + ' inside ' + prevNode;
      }
      
      array.push(expression);
      typeLog[node.type] = true;

      // basecase
      if (node.body === undefined) {return;}
      
      // recursively walk through the object
      if (node.body.length === undefined) {
        walk(node.body, expression);
      } else {
        for(var i = 0; i < node.body.length; i++) {
          walk(node.body[i], expression);
        }
      }
    })(object, null);

    array.shift();

    // inform the application that the user has updated their code and send any event handlers the updated code structure
    $rootScope.$broadcast('update', array, typeLog);
  };

  var isInside = function (array, outside, inside) { // Helper function to check if one type of code is nested in another
    var wrapped = false;
    array.forEach(function ( node ) {
      var check = node.split(' inside ');
      var isWrapped = false;
      check.forEach(function ( innderNode ) {
        if(innderNode === inside) { isWrapped = true; }
        if(innderNode === outside && isWrapped === true) { wrapped = true; }
      });
    });
    return wrapped;
  };

  var doesExist = function(object, target) { // helper function to check if one type of code exists in a project
    if (target in object) {
      return true;
    } else {
      return false;
    }
  };

  return {
    parse: parse,
    isInside: isInside,
    doesExist: doesExist
  };

}]);