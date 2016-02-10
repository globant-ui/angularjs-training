var income = angular.module('income', ['ngRoute', 'myApp']);


income.controller('incomeController', function($scope, incomeService, $http, myService) {
 $scope.edit_income = "";
 $scope.temp_2 = {
  amount: "",
  type: ""
 };

 $scope.total_income = incomeService.total_income;
 $scope.total_expense = incomeService.total_expense;
 $scope.total_balance = incomeService.total_balance;

 $scope.income_table = incomeService.income_table;
 $scope.expense_table = incomeService.expense_table;
 $scope.enter_income = incomeService.enter_income;
 $scope.enter_expense = incomeService.enter_expense;

 $scope.incomes = incomeService.incomes;

 $scope.add_income = function() {
  incomeService.temp_2 = $scope.temp_2;

  if ($scope.edit_income === "") {
   $http({
    method: 'POST',
    url: 'http://demo3547198.mockable.io/income',
    data: $scope.temp_2
   }).then(function successCallback(response) {

    $scope.message = response.data;
    incomeService.incomes.push($scope.message);
    incomeService.total_income = incomeService.total_income + $scope.message.amount;
    $scope.total_income = incomeService.total_income;
    incomeService.total_balance = incomeService.total_balance + $scope.message.amount;
    $scope.total_balance = incomeService.total_balance;
   }, function errorCallback(response) {
    alert("failure message");
   })

  }
  incomeService.add_income();
  $scope.temp_2 = {
   amount: "",
   type: ""
  };


  $scope.total_income = incomeService.total_income;
  $scope.total_expense = incomeService.total_expense;
  $scope.total_balance = incomeService.total_balance;


 };

 $scope.show_income = function() {
  $scope.income_table = true;
 };



 $scope.edit_income_form = function(index) {

  $scope.edit_income = index;
  incomeService.edit_income = index;
  $scope.temp_2.amount = incomeService.incomes[index].amount;
  $scope.temp_2.type = incomeService.incomes[index].type;
  $http({
   method: 'PUT',
   url: 'http://demo3547198.mockable.io/income',
  }).then(function successCallback(response) {
   $scope.message = response.data;

   incomeService.total_income = incomeService.total_income + $scope.message.amount - incomeService.incomes[0].amount;
   incomeService.total_balance = incomeService.total_balance + $scope.message.amount - incomeService.incomes[0].amount;

   incomeService.incomes[0] = $scope.message;
   $scope.total_income = incomeService.total_income;
   $scope.total_balance = incomeService.total_balance;
   $scope.incomes = incomeService.incomes;

  }, function errorCallback(response) {
   alert("failure message");
  })

 };

 $scope.delete_income_form = function(index) {
  $http({
   method: 'DELETE',
   url: 'http://demo3547198.mockable.io/income',
  }).then(function successCallback(response) {
   $scope.message = response.data;
   $scope.total_income = $scope.total_income - $scope.incomes[$scope.message.index].amount;
   incomeService.total_income = $scope.total_income;
   $scope.incomes.splice($scope.message.index, 1);
   incomeService.incomes = $scope.incomes;
   $scope.total_balance = $scope.total_income - $scope.total_expense;
   incomeService.total_balance = $scope.total_balance;

  }, function errorCallback(response) {
   alert("failure message");
  })

  $scope.total_income = $scope.total_income - $scope.incomes[index].amount;
  incomeService.total_income = $scope.total_income;
  $scope.incomes.splice(index, 1);
  incomeService.incomes = $scope.incomes;
  $scope.total_balance = $scope.total_income - $scope.total_expense;
  incomeService.total_balance = $scope.total_balance;

 };

});