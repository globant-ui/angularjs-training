var expense = angular.module('expense',['ngRoute']);

expense.controller('expenseController',function($scope,expenseService,incomeService){
  	$scope.income_table = incomeService.income_table;
    $scope.expense_table = incomeService.expense_table;
    $scope.enter_income = incomeService.enter_income;
    $scope.enter_expense = incomeService.enter_expense;
		$scope.total_income = incomeService.total_income;
	$scope.total_expense = incomeService.total_expense;
  	$scope.total_balance = incomeService.total_balance;

	$scope.temp = new Object();
    	$scope.temp = {
         	   amount : "",
         	   date : "",
         	   category : "",
         	   payment : "",
             notes : ""
            };




	$scope.expenses = incomeService.expenses;

  	$scope.temp = incomeService.temp;
  	$scope.show_expense = function(){
  			  $scope.expense_table = true;
    				};

  	$scope.add_expense = function()
  	{
  		incomeService.temp = $scope.temp;
  		console.log("**" + incomeService.temp.date + "**");
  		incomeService.add_expense();
  		$scope.temp = {
      	     	   amount : "",
      	     	   date : "",
      	     	   category : "",
      	     	   payment : "",
                 notes : ""
      	        };
  	 $scope.total_income = incomeService.total_income;
      $scope.total_expense = incomeService.total_expense;
      $scope.total_balance = incomeService.total_balance;


  	};

  	$scope.edit_expense_form = function (index){

      		$scope.edit_expense = index;
      		incomeService.edit_expense = index;
      		$scope.temp.amount = incomeService.expenses[index].amount;
      		$scope.temp.category = incomeService.expenses[index].category;
      			$scope.temp.date = incomeService.expenses[index].date;
      				$scope.temp.payment = incomeService.expenses[index].payment;
      				$scope.temp.notes = incomeService.expenses[index].notes;
      	};



  	$scope.delete_expense_form = function(index){
    		$scope.total_expense = $scope.total_expense - $scope.expenses[index].amount;
  			incomeService.total_expense = $scope.total_expense;
    			$scope.expenses.splice(index,1);
  				incomeService.expenses = $scope.expenses;
        			$scope.total_balance = $scope.total_income - $scope.total_expense;
  				incomeService.total_balance = $scope.total_balance;
    	};

});