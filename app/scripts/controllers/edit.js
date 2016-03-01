'use strict';

angular.module('myAppApp')
  .controller('EditCtrl', ['$scope', 'incomeService', 'expenseService', 'categoryService', '$route', '$routeParams', '$rootElement', '$location', function ($scope, incomeService, expenseService, categoryService, $route, $routeParams, $rootElement, $location) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
   
    $scope.type = $routeParams.type;
    $scope.id = $routeParams.id;

    $scope.modeOfPayment = categoryService.getMode();
    
    $scope.t = [];
    $scope.t.modeOfPayment = 'cheque'
    
    if ($scope.type == 'income') {
        $scope.t = incomeService.getData($scope.id);
        $scope.t.type = 'income'
    } else {
        $scope.t = expenseService.getData($scope.id);
        $scope.t.type = 'expense'
    }
    
    $scope.setCategory = function(){
        $scope.category = categoryService.setCategory($scope.t.type); 
    }
    
    $scope.submit = function(){
        if ($scope.t.type == 'income') {
            $location.path('/income');
        } else {
            $location.path('/expense');
        }
    }
    
    $scope.setCategory();
    
  }]);
  