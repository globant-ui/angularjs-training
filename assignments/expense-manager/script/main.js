var myapp = angular.module("expenseManagerApp",[]);


myapp.controller("showIncomeExpenseController",['$scope','$http','expenseManagerIncomeService','expenseManagerExpenseService',function($scope,$http,expenseManagerIncomeService,expenseManagerExpenseService){
	$scope.selfData="Ashwini";
	$scope.showIncome = false;
	$scope.showExpense = true;
	$scope.showAddIncome = false;
	$scope.showAddExpense = false;
	$scope.modeOfPayment = ["cash","electronic_transfer","cheque","credit_card"];
	$scope.category = ["Salary","Loan Installment","Shopping","Medicines","Freelancing","Saving","Bill"];
	$scope.subcategory = [
	"Full Time","Edu Loan","Electronic","Emergency","Part Time","Policies"
	];
	$scope.balance = "150000";
	$scope.totalExpenses = "1500";
	$scope.totalIncome = "15000";
	$scope.noIncomeData = false;
	$scope.noExpenseData = false;
	

	
		
	$scope.showIncomeDetails = function(callFromEdit){
		if(callFromEdit == 1 ) {
			$http({
				method: 'PUT',
				url: 'https://api.myjson.com/bins/4esbx',
				data: angular.toJson($scope.incomeData)
			})
			.then(function(response){
				console.log("done");
			});			
		} 
		expenseManagerIncomeService.getIncomeData()
		.then(function(data){
			if(typeof data === 'object') {
				$scope.incomeData = data;
				expenseManagerIncomeService.showIncomeDetails($scope);	
			} else {
				$scope.noIncomeData = true;
				$scope.noExpenseData = false;
				console.log('error');
			}
		},function(error) {
			$scope.noIncomeData = true;
			$scope.noExpenseData = false;
			console.log(error);
		}); 		
	}

	$scope.addIncome = function(){
		expenseManagerIncomeService.addIncome($scope);		
	}

	$scope.addIncomeSave = function(){
		expenseManagerIncomeService.addIncomeSave($scope);	
		$http({
			method: 'PUT',
			url: 'https://api.myjson.com/bins/4esbx',
			data: angular.toJson($scope.incomeData)
		})
		.then(function(response){
			console.log("done");
		});
	}

	$scope.editIncome = function(index){
		expenseManagerIncomeService.editIncome($scope,index);		
	}


	$scope.deleteIncome = function(index){
		expenseManagerIncomeService.deleteIncome($scope,index);
			
	}


	/**************** Expense Details **********************/

	$scope.showExpenseDetails = function(callFromEdit){
		if(callFromEdit == 1 ) {	
			$http({
				method: 'PUT',
				url: 'https://api.myjson.com/bins/1s12d',
				data: angular.toJson($scope.expenseData)
			})
			.then(function(response){
				console.log("done");
			});
		}	
		expenseManagerExpenseService.getExpenseData()
		.then(function(data){
			if(typeof data === 'object') {
				$scope.expenseData = data;
				expenseManagerExpenseService.showExpenseDetails($scope);
			} else {
				console.log('error');
				$scope.noExpenseData = true;
				$scope.noIncomeData = false;
			}
		},function(error) {
			console.log(error);
			$scope.noExpenseData = true;
			$scope.noIncomeData = false;
		});	
	}

	$scope.addExpense = function(){
		expenseManagerExpenseService.addExpense($scope);		
	}

	$scope.addExpenseSave = function(){
		expenseManagerExpenseService.addExpenseSave($scope);	
		$http({
			method: 'PUT',
			url: 'https://api.myjson.com/bins/1s12d',
			data: angular.toJson($scope.expenseData)
		})
		.then(function(response){
			console.log("done");
		});
	}

	$scope.editExpense = function(index){
		expenseManagerExpenseService.editExpense($scope,index);	
	}


	$scope.deleteExpense = function(index){
		expenseManagerExpenseService.deleteExpense($scope,index);
				
	}

}]);


