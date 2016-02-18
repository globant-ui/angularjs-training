'use strict';

angular.module('myAppApp')
  .controller('EditCtrl', ['$scope', 'incomeService', 'expenseService', '$route', '$routeParams', function ($scope, incomeService, expenseService, $route, $routeParams) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
   
    $scope.type = $routeParams.type;
    $scope.id = $routeParams.id;
    
    console.log($scope.type);
    console.log($scope.id);
      
  }]);
  