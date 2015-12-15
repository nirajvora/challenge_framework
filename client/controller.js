app.controller('PageController', ['$scope', 'CodeFactory', function ( $scope, CodeFactory ) { // This serves as the controller for the one-page web app
  
  // Event handler that listens for a user to update their input to the text area
  // Every keystroke will trigger the outer function
  $scope.$on('update', function ( event, data, log ) {
    $scope.$apply(function ( ) { 
      
      //update the display of the user's code's structure
      $scope.structure = data;

      //If this point in the call stack has been reached, it means acorn has not thrown an error and the display variable can updated if needed
      $scope.error = 'No Errors';

      //update the requirement colors: green means that requirement is currently passing; red means it is not.
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



  // I couldn't figure out how to get acorn to send the controller the syntax errors instead of throwing them in the console without triggering an infinite loop
  // So instead of printing each specific error as it comes right in front of the user, I just refereence the console when there is an error
  // However, I did readjust the page styles slightly so that everything can still be seen while having the console open at the bottom
  window.onerror = function ( ) {
    $scope.$apply(function ( ) {
      $scope.error = 'ERROR: look at your console!';
    });
  };


  //initializing display variables
  $scope.error = 'No Errors';
  $scope.structure = "";

  $scope.whiteStyle = {color: 'red'};
  $scope.blackStyle = {color: 'green'};


  //This is the simple problem I came up with to demonstrate how I would implement the requirements
  $scope.task = 'Create an array consisting of only numbers. Add all numbers that are larger than 3';
  $scope.whiteList = 'There must be at least one variable declaration';
  $scope.blackList = 'There must not be an if statement inside the for loop';
}]);