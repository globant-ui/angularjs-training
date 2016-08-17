angular.module("expenseManagerApp").controller("manipulateIncomeExpenseController",['$scope','$http','CRUD','$routeParams','ngDialog','$location','$rootScope',function(vm,$http,CRUD,$routeParams,ngDialog,$location,$rootScope){

	var vm = this;
	
	if($rootScope.routes != $location.$$path){
		$rootScope.routes = $location.$$path;
	}	

	

	//editing transaction
	vm.editTransaction = function(index){
		if(vm.data_source == CRUD.incomeUrl){
		 	vm.transactionData = CRUD.incomeData;
		} else if(vm.data_source == CRUD.expenseUrl) {
			vm.transactionData = CRUD.expenseData;
		}
		CRUD.editTransaction(vm,index);		
	}

	//updating transaction after editing
	vm.updateTransaction = function(){

		CRUD.updateTransaction(vm);	
		$location.path('/showIncomeExpenseDetails/'+vm.addNew.transType);
	}

	//deleting transaction
	vm.deleteTransaction = function(transactionData,index){
		
		 ngDialog.openConfirm({
            template: './views/dialogTemplates/confirmDeletion.html',
            className: 'ngdialog-theme-default'
        }).then(function (value) {
        	if(transactionData.length>0){
        		if(transactionData[0].transType == 'income'){
					vm.data_source = CRUD.incomeUrl;
				} else if(transactionData[0].transType == 'expense') {
					vm.data_source = CRUD.expenseUrl;
				}
				vm.transactionData = transactionData;
				
				CRUD.deleteTransaction(vm,index);
        	}
        }, function (reason) {
            console.log('Modal promise rejected. Reason: ', reason);
        });			
	}

	//invoking the methods according to the user input action and initializing respective myjson urls and respective data
	if($routeParams.action == 'edit'){
		if($routeParams.transactionType == 'income' || $routeParams.transactionType == 'recurincome'){
			vm.showPayer = true;
			vm.transactionData = CRUD.incomeData;
			if($routeParams.transactionType == 'income') {
				vm.data_source = CRUD.incomeUrl;
			} else {
				vm.data_source = CRUD.recurringIncomeUrl;
			}
			
		} else if($routeParams.transactionType == 'expense' || $routeParams.transactionType == 'recurexpense'){
			vm.showPayee = true;
			vm.transactionData = CRUD.expenseData;
			if($routeParams.transactionType == 'expense') {
				vm.data_source = CRUD.expenseUrl;
			} else {
				vm.data_source = CRUD.recurringExpenseUrl;
			}
		}
		vm.editTransaction($routeParams.index);
	} else if($routeParams.action == 'delete') {
		vm.deleteTransaction($routeParams.index);
	}
	
}]);