'use strict';

angular.module('myAppApp')
  .controller('EditCtrl', ['$scope', 'incomeService', 'expenseService', '$route', '$routeParams', '$rootElement', '$location', function ($scope, incomeService, expenseService, $route, $routeParams, $rootElement, $location) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
   
    $scope.type = $routeParams.type;
    $scope.id = $routeParams.id;
    
    $scope.t;
    
    if ($scope.type == 'income') {
        $scope.t = incomeService.getData($scope.id);
    } else {
        $scope.t = expenseService.getData($scope.id);
    }
    
    $scope.submit = function(){
        if ($scope.t.type == 'income') {
            $location.path('/income');
        } else {
            $location.path('/expense');
        }
    }
    
  }]);
  