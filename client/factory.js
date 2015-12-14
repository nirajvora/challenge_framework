app.factory('CodeFactory', [ '$rootScope', function ( $rootScope ) { // This factory handles all user input code
  
  var parse = function( string ) {
    var object = acorn.parse(string);
    var array = [];
    (function walk( node ) {
      array.push(node.type);
      if (node.body === undefined) {return;}
      if (node.body.length === undefined) {
        walk(node.body);
      } else {
        for(var i = 0; i < node.body.length; i++) {
          walk(node.body[i]);
        }
      }
    })(object);

    $rootScope.$broadcast('update', array);
  };

  return {
    parse: parse
  };
}]);