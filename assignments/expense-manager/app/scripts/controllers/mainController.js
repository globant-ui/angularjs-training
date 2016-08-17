angular.module("expenseManagerApp").controller("mainController",['$scope','CRUD','MODE_OF_PAYMENT','CATEGORY','SUB_CATEGORY','SELECTED_RECURRING_TYPE',function($scope,CRUD,MODE_OF_PAYMENT,CATEGORY,SUB_CATEGORY,SELECTED_RECURRING_TYPE){
	var vm = this;
	vm.initData = function() {
		vm.modeOfPayment = MODE_OF_PAYMENT;
		vm.category = CATEGORY;
		vm.subcategory = SUB_CATEGORY;
		vm.selectedRecurringType = SELECTED_RECURRING_TYPE;
		
		vm.success = CRUD.getTotalDetails(vm); //getting the total income, expense and balance.
		
	}

	//initializing data for category - subcategory and mode of payment combo boxes
	vm.initData();



}]);