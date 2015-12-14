app.controller('PageController', ['$scope', function ( $scope ) { // This serves as the controller for the one-page web app
  $scope.$on('update', function ( event, data ) {
    $scope.$apply(function (){ $scope.structure = data; });
  });

  $scope.structure = "";
}]);