myapp.controller("mainController",['$scope','CRUD',function($scope,CRUD){
	
	$scope.initData = function() {

		$scope.modeOfPayment = ["cash","electronic_transfer","cheque","credit_card"];
		$scope.category = ["Salary","Loan Installment","Shopping","Medicines","Freelancing","Saving","Bill"];
		$scope.subcategory = ["Full Time","Edu Loan","Electronic","Emergency","Part Time","Policies"];
		$scope.selectedRecurringType = {
			name: "Monthly"
		};

		CRUD.getTotalDetails($scope); //getting the total income, expense and balance.
	}

	//initializing data for category - subcategory and mode of payment combo boxes
	$scope.initData();



}]);