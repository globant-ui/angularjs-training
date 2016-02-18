
'use strict';

angular.module('myAppApp')
  .controller('TableCtrl', ['$scope', 'incomeService', 'expenseService', '$route', '$routeParams', function ($scope, incomeService, expenseService, $route, $routeParams) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
    console.log("Hi in income controller");
    $scope.type = $routeParams.type;
    $scope.TransValue;
   
    $scope.getIncomeData = function(){
        $scope.TransValue = incomeService.postData(null);
    }
    
    $scope.getExpenseData = function(){
        $scope.TransValue = expenseService.postData(null);
    }

    if ($scope.type == 'income') {
       $scope.getIncomeData();
    } else {
        $scope.getExpenseData();        
    }  
  }]);
  