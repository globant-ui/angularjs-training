myapp.controller("manipulateIncomeExpenseController",['$scope','$http','CRUD','$routeParams','ngDialog','$location',function($scope,$http,CRUD,$routeParams,ngDialog,$location){
	
	//editing transaction
	$scope.editTransaction = function(index){
		CRUD.editTransaction($scope,index);		
	}

	//updating transaction after editing
	$scope.updateTransaction = function(){
		CRUD.updateTransaction($scope);	
		$location.path('/showIncomeExpenseDetails/'+$scope.addNew.transType);
	}

	//deleting transaction
	$scope.deleteTransaction = function(index){
		if($scope.transType == 'income'){
			$scope.data_source = CRUD.incomeUrl;
		} else {
			$scope.data_source = CRUD.expenseUrl;
		}
		CRUD.deleteTransaction($scope,index);		
	}

	//invoking the methods according to the user input action and initializing respective myjson urls and respective data
	if($routeParams.action == 'edit'){
		if($routeParams.transactionType == 'income'){
			$scope.showPayer = true;
			$scope.transactionData = CRUD.incomeData;
			$scope.data_source = CRUD.incomeUrl;
		} else {
			$scope.showPayee = true;
			$scope.transactionData = CRUD.expenseData;
			$scope.data_source = CRUD.expenseUrl;
		}
		$scope.editTransaction($routeParams.index);
	} else if($routeParams.action == 'delete') {
		$scope.deleteTransaction($routeParams.index);
	}
}]);