/* global expenseURLPath */
/* global incomeURLPath */
'use strict';

/**
 * @ngdoc function
 * @name myAppApp.controller:IncomeCtrl
 * @description
 * # TableCtrl
 * Controller of the myAppApp
 */
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
    $scope.totalIncome = 0;
    $scope.totalEcpense = 0;
    $scope.totalBalance = 0;
   
    $scope.getIncomeData = function(){
        $scope.TransValue = incomeService.postData(null);
    }
    
    $scope.getExpenseData = function(){
        $scope.TransValue = expenseService.postData(null);
    }

    $scope.modify = function(){
        // console.log("in modify");
        $('#save-btn').show();
    }
    
    $scope.del = function(type, id){
        if (type == 'income') {
            incomeService.deleteData(id);
        } else {
            expenseService.deleteData(id);
        }
    }
    
    if ($scope.type == 'income') {
       $scope.getIncomeData();
    } else {
        $scope.getExpenseData();        
    }  
  }]);
  