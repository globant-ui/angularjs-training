'use strict';

angular.module('myAppApp')
  .controller('AddCtrl', function ($scope, incomeService, expenseService, categoryService, $rootElement, $location) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
    var data;
    $scope.t = [];
    $scope.t.type = 'income';
    $scope.t.category = 'salary';
    $scope.t.modeOfPayment = 'cheque'
    $scope.modeOfPayment = categoryService.getMode();
    
    $scope.setCategory = function(){
        $scope.category = categoryService.setCategory($scope.t.type); 
    }
   
    $scope.submit = function(){
        if ($scope.t.type == 'income') {
            data = incomeService.postData($scope.t);
            $location.path('/income');
        } else {
            data = expenseService.postData($scope.t);
            $location.path('/expense');
        }
    }
    
    $scope.setCategory();
    
  });
