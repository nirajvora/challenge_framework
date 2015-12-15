app.controller('PageController', ['$scope', 'CodeFactory', function ( $scope, CodeFactory ) { // This serves as the controller for the one-page web app
  $scope.$on('update', function ( event, data, log) {
    $scope.$apply(function ( ) {
      
      $scope.structure = data;
      $scope.error = 'No Errors';

      if(CodeFactory.isInside( data, 'ForStatement', 'IfStatement')) {
        $scope.blackStyle = {color: 'red'};
      } else {
        $scope.blackStyle = {color: 'green'};
      }
      if (CodeFactory.doesExist( log, 'VariableDeclaration' ) && CodeFactory.doesExist( log, 'ForStatement')) {
        $scope.whiteStyle = {color: 'green'};
      } else {
        $scope.whiteStyle = {color: 'red'};
      }

    });
  });

  $scope.structure = "";

  window.onerror = function ( ) {
    $scope.$apply(function ( ) {
      $scope.error = 'ERROR: look at your console!';
    });
  };

  $scope.error = 'No Errors';

  $scope.whiteStyle = {color: 'red'};
  $scope.blackStyle = {color: 'green'};

  $scope.task = 'Create an array consisting of only numbers. Add all numbers in the array larger than 3';
  $scope.whiteList = 'There must be at least one variable declaration';
  $scope.blackList = 'There must not be an if statement inside the for loop';
}]);