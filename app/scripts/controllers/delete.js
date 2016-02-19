'use strict';

angular.module('myAppApp')
  .controller('DltCtrl', ['$scope', 'incomeService', 'expenseService', '$route', '$routeParams', '$rootElement', '$location', function ($scope, incomeService, expenseService, $route, $routeParams, $rootElement, $location) {
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
            $location.path('/income');
        } else {
            expenseService.deleteData($scope.id);
            $location.path('/expense');
        }
    }
    
    $scope.del();
    
  }]);
  