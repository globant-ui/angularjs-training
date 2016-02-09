var income = angular.module('income',['ngRoute','myApp']);


income.controller('incomeController',function($scope,incomeService,$http,myService){
    $scope.edit_income = "";
         	$scope.temp_2 = {
      	     	   amount : "",
      	     	   type : ""
      	        };

  	$scope.total_income = incomeService.total_income;
  	$scope.total_expense = incomeService.total_expense;
    	$scope.total_balance = incomeService.total_balance;

  	$scope.income_table = incomeService.income_table;
    $scope.expense_table = incomeService.expense_table;
    $scope.enter_income = incomeService.enter_income;
    $scope.enter_expense = incomeService.enter_expense;

	$scope.incomes = incomeService.incomes;

  	$scope.add_income = function()
  	{
  	incomeService.temp_2 = $scope.temp_2;

  	incomeService.add_income();
  		$scope.temp_2 = {
      	     	   amount : "",
      	     	   type : ""
      	        };


      	 $scope.total_income = incomeService.total_income;
         $scope.total_expense = incomeService.total_expense;
         $scope.total_balance = incomeService.total_balance;


  	};

	$scope.show_income = function(){
			  $scope.income_table = true;
  				};



	$scope.edit_income_form = function (index){

		$scope.edit_income = index;
		incomeService.edit_income = index;
		$scope.temp_2.amount = incomeService.incomes[index].amount;
		$scope.temp_2.type = incomeService.incomes[index].type;

	};

  $scope.delete_income_form = function(index){
  		$scope.total_income = $scope.total_income - $scope.incomes[index].amount;
  	incomeService.total_income = $scope.total_income;
  			$scope.incomes.splice(index,1);
  		incomeService.incomes = $scope.incomes;
      			$scope.total_balance = $scope.total_income - $scope.total_expense;
      			incomeService.total_balance = $scope.total_balance;

  	};

});