angular.module("expenseManagerApp").controller("addIncomeExpenseController",['$scope','$http','CRUD','$routeParams','ngDialog','$location','$rootScope','toaster','$timeout',function(vm,$http,CRUD,$routeParams,ngDialog,$location,$rootScope,toaster,$timeout){
	//initiallizing variables
	var vm = this;
	vm.transactionData = {};
	vm.transType = $routeParams.transactionType;	 
	vm.selfData = "Ashwini";	
	vm.showAddTransaction = true;
	
	if($rootScope.routes != $location.$$path){
		$rootScope.routes = $location.$$path;
	}

	function getAndShowIncomeExpenseData(transactionType){
		if( vm.transType == 'income' || vm.transType == 'expense' ){
			transData = eval('this.'+transactionType+'Data');
			
			if(vm.transType == 'income'){
				vm.showPayer = true;
				vm.showPayee = false;
				vm.transactionData = CRUD.getIncomeData();
			}
			else {
				vm.showPayee = true;
				vm.showPayer = false;
				vm.transactionData = CRUD.getExpenseData();
			}
			//vm.transactionData = eval('CRUD.get'+transactionType.substring(0,1).toUpperCase()+transactionType.substring(1)+'Data()');
		
			if(Object.keys(vm.transactionData).length === 0){
				
				vm.data_source =  eval('CRUD.'+vm.transType+'Url');
				CRUD.getIncomeExpenseData(vm)
				.then(function(data){
					if(typeof data === 'object') {
						vm.transactionData = data;
						if(vm.transType == 'income'){
							vm.incomeData = data;
							CRUD.storeIncomeData();
						}
						else {
							vm.expenseData = data;
							CRUD.storeExpenseData();
						}
					} 
				});
			}
		}
	}
	
	
	getAndShowIncomeExpenseData(vm.transType);

	// first method to be called when controller initialized. Shows view according to normal add/ recurring add  
	vm.addTransaction = function(index){
		if($routeParams.transactionType == 'recurring') {
			vm.showRecurring = true;
			vm.showAddTransaction = false;
			return false;
		}
		
		CRUD.addTransaction(vm);		
	}

	//seperated out common code required for adding transactions based on the type. either recurring or normal transactions.
	//initializng variables before saving the data
	function callAddRecurringTransactionSave(data,transactionType,isRecurring){

		if(isRecurring == true && data!=null) {
			vm.transactionData = data;
			vm.addNew.recurringType = vm.selectedRecurringType.name;
		}
		
		if(transactionType == 'income'){
			vm.addNew.payee="Ashwini";
			vm.addNew.transType="income";
		} else {
			vm.addNew.payer="Ashwini";
			vm.addNew.transType="expense";
		}
		vm.addNew.transactionId = _.reduce(vm.transactionData, function(memo, num){ if(memo.transactionId>num.transactionId) { return memo.transactionId+1;} else { return num.transactionId+1;} }, 0);
		
		if(Object.keys(vm.transactionData).length === 0){
			vm.transactionData = [];
		}
		
		if(CRUD.lastFiveTransactions.length<5){
			CRUD.lastFiveTransactions.push(vm.addNew);
		} else {
			CRUD.lastFiveTransactions.shift();
			CRUD.lastFiveTransactions.push(vm.addNew);
		}

		CRUD.addTransactionSave(vm);
		
	}

	vm.addTransactionSave = function(){
		
		if(CRUD.validate(vm) == true){
			ngDialog.open({ template: './views/dialogTemplates/alertFormCompletion.html' });
		    return false;
		}
		
		if($routeParams.transactionType == 'income') {
			vm.data_source = CRUD.incomeUrl;
			callAddRecurringTransactionSave(null,'income',false);
		} else if($routeParams.transactionType == 'expense') {
			vm.data_source = CRUD.expenseUrl;
			callAddRecurringTransactionSave(null,'expense',false);
		} else if($routeParams.transactionType == 'recurring') {
			if( vm.recurringType == 'income' ) { //income
				vm.data_source = CRUD.recurringIncomeUrl;
				CRUD.getIncomeExpenseData(vm)
				.then(function(data){
					if(typeof data === 'object') {		
						callAddRecurringTransactionSave(data,'income',true);
					} 
					
				});
			} else { // expense
				vm.data_source = CRUD.recurringExpenseUrl;
				CRUD.getIncomeExpenseData(vm)
				.then(function(data){
					if(typeof data === 'object') {
						callAddRecurringTransactionSave(data,'expense',true);
					} 

				});
			}

		}
		
		$timeout( function(){
			$location.path('/showIncomeExpenseDetails/'+vm.addNew.transType);	
		}, 2000);
		
	}

	//showing add or expense view according to the option selected for add recurring transactions 
	vm.showRecurringTransaction = function(index){
		vm.showRecurringDuration = true;
		if(index == 0){
			vm.showPayer = true;
			vm.showPayee = false;
			vm.recurringType = 'income';
		} else {
			vm.showPayee = true;
			vm.showPayer = false;
			vm.recurringType = 'expense';
		}	
		CRUD.addTransaction(vm);		
	}

	vm.addTransaction(); // calls add transaction 
}]);