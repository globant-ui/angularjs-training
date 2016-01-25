// Code goes here

var app = angular.module('myapp' , []);
app.controller('mycontroller', function ($scope) {
  $scope.showIncomeTable = false;
  $scope.showExpenseTable = false;
  
  // array of expense
  $scope.expenseArray = [
  {rent:2000 , travel: 1000, party: 2000 , office: 1000 , study : 1000 , shopping: 2000}
  ]
  
  $scope.sumOfExpense = 0;
    for(var a in $scope.expenseArray[0]) {
      $scope.sumOfExpense += $scope.expenseArray[0][a];
     console.log($scope.expenseArray[0][a]);
    }
    
    console.log("sum of expense : "+ $scope.sumOfExpense);


  // array of income 
  $scope.incomeArray = [
  {salary:20000,business:10000,intrest_on_deposit: 5000}  
  ]
  
  $scope.sumOfIncome = 0;
    for(var a in $scope.incomeArray[0]) {
      $scope.sumOfIncome += $scope.incomeArray[0][a];
     console.log($scope.incomeArray[0][a]);
    }
    
  
  $scope.showIncome = function () {
    $scope.showIncomeTable = true;
    $scope.showExpenseTable = false
  }
  
   $scope.showExpense = function () {
       console.log($scope.expenseArray.length);
    $scope.showIncomeTable = false;
    $scope.showExpenseTable = true
  }

  

});