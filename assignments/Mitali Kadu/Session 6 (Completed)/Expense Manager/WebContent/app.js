var myApp = angular.module('myApp', ['ngRoute', 'ngMessages', 'report', 'income', 'expense']);

myApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

 $routeProvider
  .when('/final', {
   templateUrl: 'home.html',
  })

 .when('/income', {
   templateUrl: 'income.html',
   controller: 'incomeController'
  })
  .when('/expense', {
   templateUrl: 'expense.html',
   controller: 'expenseController'
  })

 .when('/report', {
   templateUrl: 'report.html',
   controller: 'reportController'
  })
  .otherwise({
   redirectTo: '/final'
  });


}]);




myApp.service('incomeService', function($http) {
 this.total_income = 0;
 this.total_expense = 0;
 this.total_balance = 0;
 this.edit_income = "";
 this.edit_expense = "";

 this.income_table = false;
 this.expense_table = false;
 this.enter_income = false;
 this.enter_expense = false;
 this.edit_income = "";
 this.incomes = [];


 this.expenses = [];


 this.temp = new Object();
 this.temp = {
  amount: "",
  date: "",
  category: "",
  payment: "",
  notes: ""
 };



 this.temp_2 = new Object();
 this.temp_2 = {
  amount: "",
  type: ""
 };




 this.add_income = function() {

  if (this.temp_2.amount != "" && this.temp_2.type != "") {
   this.enter_income = false;
   this.total_income = this.temp_2.amount + this.total_income;
   this.total_balance = this.total_income - this.total_expense;
   if (this.edit_income === "") {
    this.incomes.push(this.temp_2);
    alert("adding");

   } else {

    this.total_income = this.total_income - this.incomes[this.edit_income].amount;

    this.total_balance = this.total_income - this.total_expense;
    this.incomes[this.edit_income] = this.temp_2;

   }
   this.temp_2 = new Object();
   this.temp_2 = {
    amount: "",
    type: ""
   };
  } else {
   this.enter_income = true;
   return false;
  }

  this.edit_income = "";

 };

 this.add_expense = function() {

  if (this.temp.amount != "" && this.temp.date != "" && this.temp.category != "" && this.temp.payment != "") {
   this.enter_expense = false;
   this.total_expense = this.temp.amount + this.total_expense;
   this.total_balance = this.total_income - this.total_expense;
   if (this.edit_expense === "") {
    this.expenses.push(this.temp);

   } else {
    this.total_expense = this.total_expense - this.expenses[this.edit_expense].amount;

    this.total_balance = this.total_income - this.total_expense;

    this.expenses[this.edit_expense] = this.temp;

   }
   this.temp = new Object();
   this.temp = {
    amount: "",
    date: "",
    category: "",
    payment: "",
    notes: ""
   };
  } else {
   this.enter_expense = true;
   return false;
  }

  this.edit_expense = "";

 };


});

myApp.factory('myService', function($http) {
 return {

  getIncome: function() {
   return $http.get("http://demo3547198.mockable.io/income");
  }

 };
});

myApp.factory('expenseService', function($http) {
 return {

  getExpense: function() {
   return $http.get("http://demo3547198.mockable.io/expense");
  }

 };
});


myApp.controller('mainController', function($scope, incomeService, $http, myService, expenseService) {

 $scope.mainInfo = "";
 $scope.edit_expense = "";
 $scope.total_income = incomeService.total_income;
 console.log("from  main : " + incomeService.total_income);
 $scope.total_expense = incomeService.total_expense;
 $scope.total_balance = incomeService.total_balance;

 myService.getIncome().then(function(response) {
  incomeService.incomes = response.data;
  $scope.incomes = incomeService.incomes;
  console.log($scope.incomes[1].amount);
  for (i = 0; i < $scope.incomes.length; i++) {
   $scope.total_income = $scope.incomes[i].amount + $scope.total_income;
  }
  incomeService.total_income = $scope.total_income;
  $scope.total_balance = $scope.total_income - $scope.total_expense;
  incomeService.total_balance = $scope.total_balance;

  expenseService.getExpense().then(function(response) {
   incomeService.expenses = response.data;

   for (i = 0; i < response.data.length; i++) {

    $scope.created_time = new Date(incomeService.expenses[i].date);
    incomeService.expenses[i].date = $scope.created_time;
   }

   $scope.expenses = incomeService.expenses;

   for (i = 0; i < $scope.expenses.length; i++) {

    $scope.total_expense = $scope.expenses[i].amount + $scope.total_expense;
    console.log($scope.total_expense);

   }
   incomeService.total_expense = $scope.total_expense;
   $scope.total_balance = $scope.total_income - $scope.total_expense;
   incomeService.total_balance = $scope.total_balance;


  });


 });







});