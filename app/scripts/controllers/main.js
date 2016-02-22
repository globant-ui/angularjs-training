'use strict';

angular.module('myAppApp')
  .controller('MainCtrl', function ($scope, incomeService, expenseService) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
    console.log("hi in main controller");
    //add form view
    var incomeURLPath;
    var expenseURLPath;
    
    incomeURLPath = "https://demo4989304.mockable.io/incomeTransactions";
    expenseURLPath = "https://demo4989304.mockable.io/expenseTransactions";
    
    $scope.setIncomeData = function(){
        incomeService.setData(incomeURLPath, $scope.type)
            .then(function(data){
               if(data != null){
                   console.log("income set");
               } else {
                   console.log("Data is not as expected");
               }
            }, function(){
                console.log("Error in promise");
            });
    }
    
    $scope.setExpenseData = function(){
        expenseService.setData(expenseURLPath, $scope.type)
            .then(function(data){
               if(data != null){
                   console.log("expense set");
               } else {
                   console.log("Data is not as expected");
               }
            }, function(){
                console.log("Error in promise");
            });
    }
        
    $scope.setIncomeData();
    $scope.setExpenseData();
    
  });
