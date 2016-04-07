angular.module("expenseManagerApp").controller("manipulateIncomeExpenseController",['$scope','$http','CRUD','$routeParams','ngDialog','$location','$rootScope',function($scope,$http,CRUD,$routeParams,ngDialog,$location,$rootScope){
	
	if($rootScope.routes != $location.$$path){
		$rootScope.routes = $location.$$path;
	}	

	//editing transaction
	$scope.editTransaction = function(index){
		console.log($scope.data_source);
		CRUD.editTransaction($scope,index);		
	}

	//updating transaction after editing
	$scope.updateTransaction = function(){
		CRUD.updateTransaction($scope);	
		$location.path('/showIncomeExpenseDetails/'+$scope.addNew.transType);
	}

	//deleting transaction
	$scope.deleteTransaction = function(index){
		console.log("comes here");

		 ngDialog.openConfirm({
            template: './views/dialogTemplates/confirmDeletion.html',
            className: 'ngdialog-theme-default'
        }).then(function (value) {
			if($scope.transType == 'income'){
				$scope.data_source = CRUD.incomeUrl;
			} else {
				$scope.data_source = CRUD.expenseUrl;
			}
			CRUD.deleteTransaction($scope,index);	
        }, function (reason) {
            console.log('Modal promise rejected. Reason: ', reason);
        });			
	}

	//invoking the methods according to the user input action and initializing respective myjson urls and respective data
	if($routeParams.action == 'edit'){
		if($routeParams.transactionType == 'income' || $routeParams.transactionType == 'recurincome'){
			$scope.showPayer = true;
			$scope.transactionData = CRUD.incomeData;
			if($routeParams.transactionType == 'income') {
				$scope.data_source = CRUD.incomeUrl;
			} else {
				$scope.data_source = CRUD.recurringIncomeUrl;
			}
			
		} else if($routeParams.transactionType == 'expense' || $routeParams.transactionType == 'recurexpense'){
			$scope.showPayee = true;
			$scope.transactionData = CRUD.expenseData;
			if($routeParams.transactionType == 'expense') {
				$scope.data_source = CRUD.expenseUrl;
			} else {
				$scope.data_source = CRUD.recurringExpenseUrl;
			}
		}
		$scope.editTransaction($routeParams.index);
	} else if($routeParams.action == 'delete') {
		$scope.deleteTransaction($routeParams.index);
	}
}]);