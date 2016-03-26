var expense = angular.module('expense', ['ngRoute']);

expense.controller('expenseController', function($scope, expenseService, incomeService, $http) {
 $scope.income_table = incomeService.income_table;
 $scope.expense_table = incomeService.expense_table;
 $scope.enter_income = incomeService.enter_income;
 $scope.enter_expense = incomeService.enter_expense;
 $scope.total_income = incomeService.total_income;
 $scope.total_expense = incomeService.total_expense;
 $scope.total_balance = incomeService.total_balance;

 $scope.temp = new Object();
 $scope.temp = {
  amount: "",
  date: "",
  category: "",
  payment: "",
  notes: ""
 };




 $scope.expenses = incomeService.expenses;

 $scope.temp = incomeService.temp;
 $scope.show_expense = function() {
  $scope.expense_table = true;
 };

 $scope.add_expense = function() {
  incomeService.temp = $scope.temp;
  console.log("**" + incomeService.temp.date + "**");
  incomeService.add_expense();
  if ($scope.edit_expense === "") {
   $http({
    method: 'POST',
    url: 'http://demo3547198.mockable.io/expense',
    data: $scope.temp
   }).then(function successCallback(response) {
    $scope.message = response.data;
    $scope.created_time = new Date($scope.message.date);
    $scope.message.date = $scope.created_time;

    incomeService.expenses.push($scope.message);
    incomeService.total_expense = incomeService.total_expense + $scope.message.amount;
    $scope.total_expense = incomeService.total_expense;
    incomeService.total_balance = incomeService.total_balance - $scope.message.amount;
    $scope.total_balance = incomeService.total_balance;
   }, function errorCallback(response) {
    alert("failure message");
   })

  }
  $scope.temp = {
   amount: "",
   date: "",
   category: "",
   payment: "",
   notes: ""
  };
  $scope.total_income = incomeService.total_income;
  $scope.total_expense = incomeService.total_expense;
  $scope.total_balance = incomeService.total_balance;


 };

 $scope.edit_expense_form = function(index) {

  $scope.edit_expense = index;
  incomeService.edit_expense = index;
  $scope.temp.amount = incomeService.expenses[index].amount;
  $scope.temp.category = incomeService.expenses[index].category;
  $scope.temp.date = incomeService.expenses[index].date;
  $scope.temp.payment = incomeService.expenses[index].payment;
  $scope.temp.notes = incomeService.expenses[index].notes;
  $http({
   method: 'PUT',
   url: 'http://demo3547198.mockable.io/expense',
  }).then(function successCallback(response) {
   $scope.message = response.data;




   incomeService.total_expense = incomeService.total_expense + $scope.message.amount - incomeService.expenses[0].amount;
   incomeService.total_balance = incomeService.total_balance + $scope.message.amount - incomeService.expenses[0].amount;
   $scope.created_time = new Date($scope.message.date);
   $scope.message.date = $scope.created_time;

   incomeService.expenses[0] = $scope.message;
   $scope.total_expense = incomeService.total_expense;
   $scope.total_balance = incomeService.total_balance;
   $scope.expenses = incomeService.expenses;


  }, function errorCallback(response) {
   alert("failure message");
  })

 };



 $scope.delete_expense_form = function(index) {

  $http({
   method: 'DELETE',
   url: 'http://demo3547198.mockable.io/expense',
  }).then(function successCallback(response) {
   $scope.message = response.data;
   $scope.total_expense = $scope.total_expense - $scope.expenses[$scope.message.index].amount;
   incomeService.total_expense = $scope.total_expense;
   $scope.expenses.splice($scope.message.index, 1);
   incomeService.expenses = $scope.expenses;
   $scope.total_balance = $scope.total_income - $scope.total_expense;
   incomeService.total_balance = $scope.total_balance;

  }, function errorCallback(response) {
   alert("failure message");
  })


  $scope.total_expense = $scope.total_expense - $scope.expenses[index].amount;
  incomeService.total_expense = $scope.total_expense;
  $scope.expenses.splice(index, 1);
  incomeService.expenses = $scope.expenses;
  $scope.total_balance = $scope.total_income - $scope.total_expense;
  incomeService.total_balance = $scope.total_balance;
 };

});