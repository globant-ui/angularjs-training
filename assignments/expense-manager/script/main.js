var myapp = angular.module("expenseManagerApp",['ngRoute']).
	config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
	$routeProvider
	.when("/showIncomeDetails", {
		templateUrl: "showIncomeDetails.html",
		controller: "showIncomeController"
	})
	.when("/showExpenseDetails", {
		templateUrl: "showExpenseDetails.html",
		controller: "showExpenseController"
	})
	.when("/showReportsDetails", {
		templateUrl: "showReportDetails.html",
		controller: "showReportController"
	});
});

myapp.controller("showIncomeController",['$scope','$http','expenseManagerIncomeService',function($scope,$http,expenseManagerIncomeService){
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

	$scope.showIncomeDetails();

}]);


myapp.controller("showExpenseController",['$scope','$http','expenseManagerIncomeService','expenseManagerExpenseService',function($scope,$http,expenseManagerIncomeService,expenseManagerExpenseService){

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

	$scope.showExpenseDetails();
}]);


myapp.controller("showReportController",['$scope',function($scope){
	function keysrt(key) {
	  return function(a,b){
	   if (a[key] > b[key]) return 1;
	   if (a[key] < b[key]) return -1;
	   return 0;
	  }
	}
	incomeResult = $scope.incomeData;
	expenseResult = $scope.expenseData;

	incomeResult.sort(keysrt('payer'));
	expenseResult.sort(keysrt('category'));
	
	$scope.sortedIncomeResult = incomeResult;
	$scope.sortedExpenseResult = expenseResult;

}]);

myapp.controller("mainController",['$scope','expenseManagerIncomeService','expenseManagerExpenseService',function($scope,expenseManagerIncomeService,expenseManagerExpenseService){
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

}]);

