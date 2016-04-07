angular.module("expenseManagerApp").controller("mainController",['$scope','CRUD',function($scope,CRUD){
	var vm = this;
	vm.initData = function() {

		vm.modeOfPayment = ["Cash","Electronic Transfer","Cheque","Credit Card"];
		vm.category = ["Salary","Loan Installment","Shopping","Medicines","Freelancing","Saving","Bill"];
		vm.subcategory = ["Full Time","Edu Loan","Electronic","Emergency","Part Time","Policies"];
		vm.selectedRecurringType = {
			name: "Monthly"
		};
		vm.success = CRUD.getTotalDetails(vm); //getting the total income, expense and balance.
		
	}

	//initializing data for category - subcategory and mode of payment combo boxes
	vm.initData();



}]);