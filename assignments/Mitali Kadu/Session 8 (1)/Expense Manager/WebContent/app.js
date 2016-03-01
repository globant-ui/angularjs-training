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
  .when('/settings', {
     templateUrl: 'settings.html',
     controller: 'mainController'
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
 this.enter_rec_expense = false;
 this.edit_rec_expense = "";
 this.edit_income = "";
 this.incomes = [];
 this.rec_expenses = [];
 this.expenses = [];


 this.temp = new Object();
 this.temp = {
  amount: "",
  date: "",
  category: "",
  payment: "",
  notes: ""
 };

 this.temp_3 = new Object();
 this.temp_3 = {
      amount: "",
      date: "",
      category: "",
      interval : "",
      only_date : "",
      only_month : "",
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

this.add_rec_expense = function() {

  if (this.temp_3.amount != "" && this.temp_3.date != "" && this.temp_3.category != "" && this.temp_3.payment != "" && this.temp_3.interval != "") {
   this.enter_rec_expense = false;
   if (this.edit_rec_expense === "") {
    this.rec_expenses.push(this.temp_3);

   } else {
    this.rec_expenses[this.edit_rec_expense] = this.temp_3;

   }
   this.temp_3 = new Object();
   this.temp_3 = {
    amount: "",
    date: "",
    category: "",
    interval : "",
    only_date : "",
    only_month : "",
    payment: "",
    notes: ""
   };
  } else {
   this.enter_rec_expense = true;
   return false;
  }

  this.edit_rec_expense = "";

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
 $scope.edit_rec_expense = "";
 $scope.rec_expenses = [];
 $scope.rec_expenses = incomeService.rec_expenses;
 $scope.rec_expense_table = false;
 $scope.total_income = incomeService.total_income;
 console.log("from  main : " + incomeService.total_income);
 $scope.total_expense = incomeService.total_expense;
 $scope.total_balance = incomeService.total_balance;
 $scope.d = new Date();
 $scope.current_date = $scope.d.getDate();
 $scope.current_month = $scope.d.getMonth();


 console.log($scope.n);
 $scope.interval = "";
 $scope.temp_3 = {
      amount: "",
      date: "",
      category: "",
      interval : "",
      only_date : "",
      only_month : "",
      payment: "",
      notes: ""
     };

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

 $scope.add_rec_expense = function (){
  $scope.d_2 = new Date($scope.temp_3.date);
       $scope.temp_3.only_date = $scope.d_2.getDate();
       $scope.temp_3.only_month = $scope.d_2.getMonth();

       console.log("here " + $scope.temp_3.only_month);

    incomeService.temp_3 = $scope.temp_3;
    incomeService.add_rec_expense();
    $scope.rec_expenses = incomeService.rec_expenses;

    $scope.temp_3 = {
     amount: "",
     date: "",
     category: "",
     interval : "",
     only_date : "",
     only_month : "",
     payment: "",
     notes: ""
    };
 };

 $scope.show_rec_expense = function() {
   $scope.rec_expense_table = true;
  };



 });


myApp.directive('expenseNotifications', function() {
  return {
  /*  template: 'Name: {{customer.name}} Address: {{customer.address}}'*/
    restrict : 'E',
    templateUrl : 'notifications.html',

  }});