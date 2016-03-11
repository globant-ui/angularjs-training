myapp.controller("showReportController",['$scope','CRUD',function($scope,CRUD){

	//function to sort an array of objects based on key
	function keysrt(key) {
	  return function(a,b){
	   if (a[key] > b[key]) return 1;
	   if (a[key] < b[key]) return -1;
	   return 0;
	  }
	}

	//getting income data and sorting it depending on payer key
	var transactionResult = {};
	transactionResult = CRUD.getIncomeData();
	
	if(Object.keys(transactionResult).length === 0){
		$scope.data_source =  CRUD.incomeUrl;
		CRUD.getIncomeExpenseData($scope)
		.then(function(data){
			if(typeof data === 'object') {
				transactionResult = data;
				$scope.incomeData = data;
				CRUD.storeIncomeData($scope);
				transactionResult.sort(keysrt('payer'));
				$scope.sortedIncomeResult = transactionResult;
			} 
		});
	} else {
		transactionResult.sort(keysrt('payer'));
		$scope.sortedIncomeResult = transactionResult;
	}
	
	//getting expense data and sorting it depending on category key
	transactionResult = CRUD.getExpenseData();
	if(Object.keys(transactionResult).length === 0){
		$scope.data_source = CRUD.expenseUrl;
		CRUD.getIncomeExpenseData($scope)
		.then(function(data){
			if(typeof data === 'object') {
				transactionResult = data;
				$scope.expenseData = data;
				CRUD.storeExpenseData($scope);
				transactionResult.sort(keysrt('category'));
				$scope.sortedExpenseResult = transactionResult;
			} 
		});	
	} else {
		transactionResult.sort(keysrt('category'));
		$scope.sortedExpenseResult = transactionResult;
	}
	
	

}]);