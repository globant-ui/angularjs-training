myapp.controller("showIncomeExpenseController",['$scope','$http','CRUD','$routeParams','ngDialog',function($scope,$http,CRUD,$routeParams,ngDialog){

	//initializing variables
	$scope.transactionData = [];
	$scope.transType = $routeParams.transactionType;	 
	$scope.selfData = "Ashwini";	
	$scope.showTransaction = false;
	$scope.showDirective = false;
	
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
		
}]);