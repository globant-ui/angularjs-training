myapp.controller("addIncomeExpenseController",['$scope','$http','CRUD','$routeParams','ngDialog','$location',function($scope,$http,CRUD,$routeParams,ngDialog,$location){

	//initiallizing variables
	$scope.transactionData = [];
	$scope.transType = $routeParams.transactionType;	 
	$scope.selfData = "Ashwini";	
	$scope.showAddTransaction = true;

	if($scope.transType == 'income'){
		$scope.showPayer = true;
		$scope.showPayee = false;
		$scope.transactionData = CRUD.getIncomeData();
	
		if(Object.keys($scope.transactionData).length === 0){
			$scope.data_source =  CRUD.incomeUrl;
			CRUD.getIncomeExpenseData($scope)
			.then(function(data){
				if(typeof data === 'object') {
					$scope.transactionData = data;
					$scope.incomeData = data;
					CRUD.storeIncomeData($scope);
				} 
			});
		}
	} else {
		$scope.showPayee = true;
		$scope.showPayer = false;
		$scope.transactionData = CRUD.getExpenseData();
		if(Object.keys($scope.transactionData).length === 0){
			$scope.data_source = CRUD.expenseUrl;
			CRUD.getIncomeExpenseData($scope)
			.then(function(data){
				if(typeof data === 'object') {
					$scope.transactionData = data;
					$scope.expenseData = data;
				} 
			});
		}
	}

	// first method to be called when controller initialized. Shows view according to normal add/ recurring add  
	$scope.addTransaction = function(){
		if($routeParams.transactionType == 'recurring') {
			$scope.showRecurring = true;
			$scope.showAddTransaction = false;
			return false;
		}
		CRUD.addTransaction($scope);		
	}

	//seperated out common code required for adding transactions based on the type. either recurring or normal transactions.
	//initializng variables before saving the data
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
		CRUD.addTransactionSave($scope);
		return true;
	}

	$scope.addTransactionSave = function(){
		if(CRUD.validate($scope) == true){
			ngDialog.open({ template: 'formEmpty' });
		    return false;
		}
		
		if($routeParams.transactionType == 'income') {
			$scope.data_source = CRUD.incomeUrl;
			callAddRecurringTransactionSave(null,'income',false);
		} else if($routeParams.transactionType == 'expense') {
			$scope.data_source = CRUD.expenseUrl;
			callAddRecurringTransactionSave(null,'expense',false);
		} else if($routeParams.transactionType == 'recurring') {
			if( $scope.recurringType == 'income' ) { //income
				$scope.data_source = CRUD.recurringIncomeUrl;
				CRUD.getIncomeExpenseData($scope)
				.then(function(data){
					if(typeof data === 'object') {
						callAddRecurringTransactionSave(data,'income',true);
					} 
				});
			} else { // expense
				$scope.data_source = CRUD.recurringExpenseUrl;
				CRUD.getIncomeExpenseData($scope)
				.then(function(data){
					if(typeof data === 'object') {
						callAddRecurringTransactionSave(data,'expense',true);
					} 
				});
			}

		}
		$location.path('/showIncomeExpenseDetails/'+$scope.addNew.transType);	
	}

	//showing add or expense view according to the option selected for add recurring transactions 
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
		CRUD.addTransaction($scope);		
	}

	$scope.addTransaction(); // calls add transaction 
}]);