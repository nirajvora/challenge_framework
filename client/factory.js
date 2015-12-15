app.factory('CodeFactory', [ '$rootScope', function ( $rootScope ) { // This factory handles all user input code
  
  var parse = function( string ) {
    var object = acorn.parse(string);
    var array = [];
    var typeLog = {};
    (function walk( node, prevNode ) {
      var expression;
      if(prevNode === null || prevNode === 'Program') {
        expression = node.type;
      } else {
        expression = node.type + ' inside ' + prevNode;
      }
      
      array.push(expression);
      typeLog[node.type] = true;

      if (node.body === undefined) {return;}
      if (node.body.length === undefined) {
        walk(node.body, expression);
      } else {
        for(var i = 0; i < node.body.length; i++) {
          walk(node.body[i], expression);
        }
      }
    })(object, null);
    array.shift();

    $rootScope.$broadcast('update', array, typeLog);
  };

  var isInside = function (array, outside, inside) {
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

  var doesExist = function(object, target) {
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