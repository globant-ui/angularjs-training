// Code goes here

var expenseMngrApp = angular.module('expenseManagerApp' , ['ngRoute']);


// Routing 
expenseMngrApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/dashboard', {
        templateUrl: 'dashboard/dashboard.html',
        controller: 'DashboardCtrl'
      }).
      when('/expense', {
        templateUrl: 'expense/expense.html',    
        controller: 'ExpenseCtrl'
      }).
      when('/income', {
        templateUrl: 'income/income.html',
        controller: 'IncomeCtrl'
      }).
    when('/report', {
        templateUrl: 'reports/reports.html',
        controller: 'ReportCtrl'
      }).
      otherwise({
        redirectTo: '/dashboard'
      });
  }]);


expenseMngrApp.controller('mycontroller', function ($scope) {
  //$scope.showIncomeTable = false;
 // $scope.showExpenseTable = false;
  
  // array of expense
    
 /* $scope.sumOfExpense = 0;
    for(var a in $scope.expenseArray[0]) {
      $scope.sumOfExpense += $scope.expenseArray[0][a];
     console.log($scope.expenseArray[0][a]);
    }
    
    console.log("sum of expense : "+ $scope.sumOfExpense);

*/
  // array of income 
/**/
  
/*  $scope.sumOfIncome = 0;
    for(var a in $scope.incomeArray[0]) {
      $scope.sumOfIncome += $scope.incomeArray[0][a];
     console.log($scope.incomeArray[0][a]);
    }
    */
  
/*
  $scope.showIncome = function () {
    $scope.showIncomeTable = true;
    $scope.showExpenseTable = false
  }
  
   $scope.showExpense = function () {
       console.log($scope.expenseArray.length);
    $scope.showIncomeTable = false;
    $scope.showExpenseTable = true
  }
*/

  

});