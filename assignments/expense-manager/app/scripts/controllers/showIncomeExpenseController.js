angular.module("expenseManagerApp").controller("showIncomeExpenseController",['$scope','$http','CRUD','$routeParams','ngDialog','$location','$route','$rootScope','usSpinnerService',function($scope,$http,CRUD,$routeParams,ngDialog,$location,$route,$rootScope,usSpinnerService){
	
	//initializing variables
	$scope.transactionData = [];
	$scope.transType = $routeParams.transactionType;	 
	$scope.selfData = "Ashwini";	
	$scope.showTransaction = false;
	$scope.showDirective = false;
	$scope.accessor = {};

	$scope.showInlineEdit = function(transData,inputType){
		if($scope.accessor.showInlineEdit) {
            $scope.accessor.showInlineEdit(transData,inputType);
        }
	}
	
	if($rootScope.routes != $location.$$path){
		$rootScope.routes = $location.$$path;
	}	

	//gets Transaction data(either income or expense) from server and show it
	if($routeParams.transactionType == 'income') {
		CRUD.getTransactionData('income',$scope);
		
	} else if($routeParams.transactionType == 'expense') {
		CRUD.getTransactionData('expense',$scope);
	}
	//to show income/expense details. 
	$scope.showIncomeExpenseDetails = function(callFromEdit){
		if($routeParams.transactionType == 'income') {
			$scope.transactionData = $scope.incomeData;	
		} else if($routeParams.transactionType == 'expense') {
			$scope.transactionData = $scope.expenseData;
		} 
		
		CRUD.showIncomeExpenseDetails($scope);

		if($routeParams.transactionType == 'recurring') {
			$scope.showTransaction = false;
			$scope.showRecurring = true;
		}  					
	}

	$scope.viewTransaction = function(index){
		//console.log($scope);
		if($scope.transType == 'income'){
			$scope.data_source = CRUD.incomeUrl;
		} else if($scope.transType == 'expense'){
			$scope.data_source = CRUD.expenseUrl;
		}

		CRUD.getIncomeExpenseData($scope).then(function(data){
			$scope.transactionData = data;
			$scope.viewData = JSON.stringify($scope.transactionData[index]);
			ngDialog.open({ template: './views/dialogTemplates/showTransactionDetails.html', data: $scope.viewData });
		});
		
		}
		
}]);