var app=angular.module("myapp",[]);
app.controller('main',  function($scope){
	$scope.income1 = false;
	$scope.expense1 = false;
	$scope.income_money = 0;
	$scope.expense_money = 0;
	$scope.savings = 0;
    $scope.income=[{
    	name:'Salary', value: 35000
    },{
    	name:'Business', value: 10000
    },{
    	name:'Interest on deposit', value: 1000
    },{
    	name:'Miscellaneous', value: 7000
    }];

    angular.forEach($scope.income, function(incomes){
    	$scope.income_money = $scope.income_money + incomes.value;
    });
    $scope.expense=[{
    	category:'Rent',
    	value: 15000,
    	mode: 'Credit',
    	date: '25-01-2016',
    	payee: 'Mr. Rahul Potnis'
    },{
    	category:'Travel',
    	value: 5000,
    	mode: 'Cash',
    	date: '25-01-2016',
    	payee: 'Miss. Isha Potnis'
    }];
    angular.forEach($scope.expense, function(expenses){
    	$scope.expense_money = $scope.expense_money + expenses.value;
    });

    $scope.people = [{
        name: "Income"
    }, {
        name: "Expenses"
    }];
    $scope.show_income = function(){
    	$scope.income1 = true;
    	$scope.expense1 = false;

    }
    $scope.show_expense = function(){
    	$scope.income1 = false;
    	$scope.expense1 = true;
    }
    $scope.savings = $scope.income_money - $scope.expense_money;
});