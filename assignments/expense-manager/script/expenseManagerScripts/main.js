var myapp = angular.module("expenseManagerApp",['ngRoute']).
	config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
	$routeProvider
	.when("/showIncomeExpenseDetails/:transactionType", {
		templateUrl: "showIncomeExpenseDetails.html",
		controller: "showIncomeExpenseController"
	})
	.when("/showReportsDetails", {
		templateUrl: "showReportDetails.html",
		controller: "showReportController"
	});
});

myapp.controller("showIncomeExpenseController",['$scope','$http','expenseManagerIncomeExpenseService','$routeParams',function($scope,$http,expenseManagerIncomeExpenseService,$routeParams){
	//initiallizing variables
	//$scope.showDetails = false;
	$scope.transactionData = [];
	$scope.transType = $routeParams.transactionType;	 
	$scope.selfData = "Ashwini";	

	//cases according to income or expense
	if($routeParams.transactionType == 'income') {
		$scope.data_source = 'https://api.myjson.com/bins/4esbx';
		expenseManagerIncomeExpenseService.getIncomeExpenseData($scope)
		.then(function(data){
			if(typeof data === 'object') {
				$scope.incomeData = data;
				$scope.showPayer = true;
				$scope.showIncomeExpenseDetails();
			} 
		});
			 
	} else if($routeParams.transactionType == 'expense') {
		$scope.data_source = 'https://api.myjson.com/bins/4h045';
		expenseManagerIncomeExpenseService.getIncomeExpenseData($scope)
		.then(function(data){
			if(typeof data === 'object') {
				$scope.expenseData = data;
				$scope.showPayee = true;		
				$scope.showIncomeExpenseDetails();	
			} 
		});	
	} 


	$scope.showIncomeExpenseDetails = function(callFromEdit){
		if(callFromEdit == 1 ) {
			$http({
				method: 'PUT',
				url: $scope.data_source,
				data: angular.toJson($scope.transactionData)
			})
			.then(function(response){
				console.log("done");
			});			
		}
		if($routeParams.transactionType == 'income') {
			$scope.transactionData = $scope.incomeData;	 
		} else if($routeParams.transactionType == 'expense') {
			$scope.transactionData = $scope.expenseData;
		} 
		console.log($scope.transactionData);
		expenseManagerIncomeExpenseService.showIncomeExpenseDetails($scope);					
	}

	$scope.addTransaction = function(){
		expenseManagerIncomeExpenseService.addTransaction($scope);		
	}

	$scope.addTransactionSave = function(){
		if($routeParams.transactionType == 'income') {
			$scope.addNew.payee = "Ashwini";
			$scope.addNew.transType = "income";	 
		} else if($routeParams.transactionType == 'expense') {
			$scope.addNew.payer = "Ashwini";
			$scope.addNew.transType = "expense";
		}
		if(Object.keys($scope.transactionData).length === 0){
			$scope.transactionData = [];
		}
		expenseManagerIncomeExpenseService.addTransactionSave($scope);	
	}

	$scope.editTransaction = function(index){
		expenseManagerIncomeExpenseService.editTransaction($scope,index);		
	}


	$scope.deleteTransaction = function(index){
		expenseManagerIncomeExpenseService.deleteTransaction($scope,index);		
	}
	
}]);

myapp.controller("showReportController",['$scope','expenseManagerIncomeExpenseService',function($scope,expenseManagerIncomeExpenseService){
	function keysrt(key) {
	  return function(a,b){
	   if (a[key] > b[key]) return 1;
	   if (a[key] < b[key]) return -1;
	   return 0;
	  }
	}

	$scope.data_source = 'https://api.myjson.com/bins/4esbx';
	expenseManagerIncomeExpenseService.getIncomeExpenseData($scope)
	.then(function(data){
		console.log(data);
		if(typeof data === 'object') {
			transactionResult = data;
			transactionResult.sort(keysrt('payer'));
			$scope.sortedIncomeResult = transactionResult;
		} 
	});
	
	$scope.data_source = 'https://api.myjson.com/bins/4h045';
	expenseManagerIncomeExpenseService.getIncomeExpenseData($scope)
	.then(function(data){
		if(typeof data === 'object') {
			transactionResult = data;
			transactionResult.sort(keysrt('category'));
			$scope.sortedExpenseResult = transactionResult;
		} 
	});	
	

}]);

myapp.controller("mainController",['$scope','expenseManagerIncomeExpenseService',function($scope,expenseManagerIncomeExpenseService){
	$scope.noTransactionData = false;
	$scope.showTransaction = false;
	$scope.showAddTransaction = false;	
	$scope.modeOfPayment = ["cash","electronic_transfer","cheque","credit_card"];
	$scope.category = ["Salary","Loan Installment","Shopping","Medicines","Freelancing","Saving","Bill"];
	$scope.subcategory = ["Full Time","Edu Loan","Electronic","Emergency","Part Time","Policies"];
	$scope.balance = "150000";
	$scope.totalExpenses = "1500";
	$scope.totalIncome = "15000";
	$scope.showPayer = false;
	$scope.showPayee = false;
}]);

