'use strict';

angular.module('myAppApp')
  .controller('DltCtrl', ['$scope', 'incomeService', 'expenseService', '$route', '$routeParams', function ($scope, incomeService, expenseService, $route, $routeParams) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
   
    $scope.type = $routeParams.type;
    $scope.id = $routeParams.id;
    
    $scope.del = function(){
        if ($scope.type == 'income') {
            incomeService.deleteData($scope.id);
        } else {
            expenseService.deleteData($scope.id);
        }
    }
    
    $scope.del();
    
  }]);
  