'use strict';
var myapp = angular.module("expenseManagerApp",['ngRoute']).
	config(function($routeProvider) {
    //$locationProvider.html5Mode(true);
	$routeProvider
	.when("/showIncomeExpenseDetails/:transactionType", {
		templateUrl: "./view/showIncomeExpenseDetails.html",
		controller: "showIncomeExpenseController"
	})
	.when("/showReportsDetails", {
		templateUrl: "./view/showReportDetails.html",
		controller: "showReportController"
	});
});

myapp.controller("showIncomeExpenseController",['$scope','$http','expenseManagerIncomeExpenseService','$routeParams',function($scope,$http,expenseManagerIncomeExpenseService,$routeParams){
	//initiallizing variables
	
	$scope.transactionData = [];
	$scope.transType = $routeParams.transactionType;	 
	$scope.selfData = "Ashwini";	
	$scope.showTransaction = false;
	$scope.showDirective = false;
	var incomeUrl = 'https://api.myjson.com/bins/4esbx';
	var expenseUrl = 'https://api.myjson.com/bins/4h045';
	var recurringIncomeUrl = 'https://api.myjson.com/bins/3wbg3';
	var recurringExpenseUrl = 'https://api.myjson.com/bins/4o6j7';

	function getTransactionData(transactionType) {

		if(transactionType == 'income') {
			$scope.incomeData = expenseManagerIncomeExpenseService.getIncomeData();
			$scope.recurringData = expenseManagerIncomeExpenseService.getRecurringIncomeData();
			$scope.tempData = $scope.incomeData;
			$scope.showPayer = true;
			$scope.data_source = incomeUrl;			
		} else if(transactionType == 'expense') {
			$scope.expenseData = expenseManagerIncomeExpenseService.getExpenseData();
			$scope.recurringData = expenseManagerIncomeExpenseService.getRecurringExpenseData();
			$scope.tempData = $scope.expenseData;
			$scope.showPayee = true;
			$scope.data_source = expenseUrl;	
		}
		
		if(Object.keys($scope.tempData).length === 0){
			expenseManagerIncomeExpenseService.getIncomeExpenseData($scope)
			.then(function(data){
				if(typeof data === 'object') {
					$scope.tempData = data;
					if(transactionType == 'income') {
						expenseManagerIncomeExpenseService.storeIncomeData($scope);	
						$scope.data_source = recurringIncomeUrl;
					} else {
						expenseManagerIncomeExpenseService.storeExpenseData($scope);	
						$scope.data_source = recurringExpenseUrl;
					}
					// getting recurring income information 
					expenseManagerIncomeExpenseService.getIncomeExpenseData($scope)
					.then(function(data){
						if(typeof data === 'object') {
							var today = new Date();
						    var mm = today.getMonth()+1; //January is 0!
						    if(mm<10){
						        mm='0'+mm
						    } 
						    
							$scope.recurringData = data.filter(function( obj ) {
								var recurDate = obj.date;
								recurDate = recurDate.substring(3, 5);
							  return recurDate == mm || obj.recurringType == 'Yearly';
							});	
							if(transactionType == 'income') {
								expenseManagerIncomeExpenseService.storeRecurringIncomeData($scope);
							} else {
								expenseManagerIncomeExpenseService.storeRecurringExpenseData($scope);
							}
							$scope.showDirective = true;
						} 
					});
					if(transactionType == 'income') {
						$scope.incomeData = $scope.tempData;
					} else {
						$scope.expenseData = $scope.tempData;
					}
					$scope.showIncomeExpenseDetails();
				} 
			});
		}

		if(transactionType == 'income') {
			$scope.incomeData = $scope.tempData;
		} else {
			$scope.expenseData = $scope.tempData;
		}
		if($scope.recurringData.length>0) {
			$scope.showDirective = true;
		}
	}
	//cases according to income or expense

	if($routeParams.transactionType == 'income') {
		getTransactionData('income');
	} else if($routeParams.transactionType == 'expense') {
		getTransactionData('expense');
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
		
		expenseManagerIncomeExpenseService.showIncomeExpenseDetails($scope);

		if($routeParams.transactionType == 'recurring') {
			$scope.showTransaction = false;
			$scope.showRecurring = true;
		}  					
	}

	$scope.addTransaction = function(){
		expenseManagerIncomeExpenseService.addTransaction($scope);		
	}

	function callAddRecurringTransactionSave(data,transactionType,isRecurring){

		if(isRecurring == true && data!=null) {
			$scope.transactionData = data;
			$scope.addNew.recurringType = $scope.selectedRecurringType.name;
		}
		
		if(transactionType == 'income'){
			$scope.addNew.payee="Ashwini";
			$scope.addNew.transType="income";
		} else {
			$scope.addNew.payer="Ashwini";
			$scope.addNew.transType="expense";
		}

		$scope.addNew.transactionId = $scope.transactionData.length + 1;						
		
		if(Object.keys($scope.transactionData).length === 0){
			$scope.transactionData = [];
		}
		expenseManagerIncomeExpenseService.addTransactionSave($scope);
		return true;
	}

	$scope.addTransactionSave = function(){

		if($routeParams.transactionType == 'income') {
			$scope.data_source = incomeUrl;
			callAddRecurringTransactionSave(null,'income',false);
		} else if($routeParams.transactionType == 'expense') {
			$scope.data_source = expenseUrl;
			callAddRecurringTransactionSave(null,'expense',false);
		} else if($routeParams.transactionType == 'recurring') {
			if( $scope.recurringType == 'income' ) { //income
				$scope.data_source = recurringIncomeUrl;
				expenseManagerIncomeExpenseService.getIncomeExpenseData($scope)
				.then(function(data){
					if(typeof data === 'object') {
						callAddRecurringTransactionSave(data,'income',true);
					} 
				});
			} else { // expense
				$scope.data_source = recurringExpenseUrl;
				expenseManagerIncomeExpenseService.getIncomeExpenseData($scope)
				.then(function(data){
					if(typeof data === 'object') {
						callAddRecurringTransactionSave(data,'expense',true);
					} 
				});
			}

		}
		
		
	}

	$scope.editTransaction = function(index){

		expenseManagerIncomeExpenseService.editTransaction($scope,index);		
	}

	$scope.deleteTransaction = function(index){
		if($scope.transType == 'income'){
			$scope.data_source = incomeUrl;
		} else {
			$scope.data_source = expenseUrl;
		}
		expenseManagerIncomeExpenseService.deleteTransaction($scope,index);		
	}
	
	$scope.showRecurringTransaction = function(index){

		$scope.showRecurringDuration = true;
		if(index == 0){
			$scope.showPayer = true;
			$scope.showPayee = false;
			$scope.recurringType = 'income';
		} else {
			$scope.showPayee = true;
			$scope.showPayer = false;
			$scope.recurringType = 'expense';
		}	
		expenseManagerIncomeExpenseService.addTransaction($scope);		
	}


	$scope.showIncomeExpenseDetails();
}]);

myapp.controller("showReportController",['$scope','expenseManagerIncomeExpenseService',function($scope,expenseManagerIncomeExpenseService){
	function keysrt(key) {
	  return function(a,b){
	   if (a[key] > b[key]) return 1;
	   if (a[key] < b[key]) return -1;
	   return 0;
	  }
	}

	var transactionResult = expenseManagerIncomeExpenseService.getIncomeData();

	if(Object.keys(transactionResult).length === 0){
		$scope.data_source = 'https://api.myjson.com/bins/4esbx';
		expenseManagerIncomeExpenseService.getIncomeExpenseData($scope)
		.then(function(data){
			if(typeof data === 'object') {
				transactionResult = data;
				$scope.incomeData = data;
				expenseManagerIncomeExpenseService.storeIncomeData($scope);
				transactionResult.sort(keysrt('payer'));
				$scope.sortedIncomeResult = transactionResult;
			} 
		});
	} else {
		transactionResult.sort(keysrt('payer'));
		$scope.sortedIncomeResult = transactionResult;
	}

	

	
	transactionResult = expenseManagerIncomeExpenseService.getExpenseData();
	if(Object.keys(transactionResult).length === 0){
		$scope.data_source = 'https://api.myjson.com/bins/4h045';
		expenseManagerIncomeExpenseService.getIncomeExpenseData($scope)
		.then(function(data){
			if(typeof data === 'object') {
				transactionResult = data;
				$scope.expenseData = data;
				expenseManagerIncomeExpenseService.storeExpenseData($scope);
				transactionResult.sort(keysrt('category'));
				$scope.sortedExpenseResult = transactionResult;
			} 
		});	
	} else {
		transactionResult.sort(keysrt('category'));
		$scope.sortedExpenseResult = transactionResult;
	}
	
	

}]);

myapp.controller("mainController",['$scope','expenseManagerIncomeExpenseService',function($scope,expenseManagerIncomeExpenseService){
	$scope.noTransactionData = false;
	$scope.showAddTransaction = false;	
	$scope.modeOfPayment = ["cash","electronic_transfer","cheque","credit_card"];
	$scope.category = ["Salary","Loan Installment","Shopping","Medicines","Freelancing","Saving","Bill"];
	$scope.subcategory = ["Full Time","Edu Loan","Electronic","Emergency","Part Time","Policies"];
	$scope.balance = "150000";
	$scope.totalExpenses = "1500";
	$scope.totalIncome = "15000";
	$scope.showPayer = false;
	$scope.showPayee = false;
	$scope.showRecurring = false;
	$scope.showRecurringDuration = false;
	$scope.recurringType = ["Monthly","Yearly"];
	$scope.selectedRecurringType = {
		name: "Monthly"
	};
		
}]);

