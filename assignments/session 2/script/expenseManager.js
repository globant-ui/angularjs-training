//script for expense manager

(function(){
	var myApp,
		name = "expenceManager",
		dependencies = [];
	myApp = angular.module(name, dependencies);
	
	myApp.controller('expenceController', ['$scope', '$log', function($scope, $log){
		$scope.income =[
			{
				transactionid : 1,
				payer : "ABC",
				payee : "self",
				category : "earnings",
				subcategory : "salary",
				amount: 15000,
				date: "1/1/2016",
				modeofpayment : "electronic_transfer",
				notes: "Salary for the month of December 2015",
				type : "Income"
			},
			{
				transactionid : 2,
				payer : "XYZ",
				payee : "self",
				category : "earnings",
				subcategory : "interest on deposits",
				amount: 8000,
				date: "1/1/2016",
				modeofpayment : "electronic_transfer",
				notes: "Interest on deposits for the month of December 2015",
				type : "Income"
			}
		];
		$scope.expenses = [
			{
				transactionid : 3,
				payer : "self",
				payee : "ABC",
				category : "grocery",
				subcategory : "fruits",
				amount: 100,
				date: "2/1/2016",
				modeofpayment : "cash",
				notes: "Mangos",
				type : "expense"
			},
			{
				transactionid : 4,
				payer : "self",
				payee : "landlord",
				category : "rent",
				subcategory : "rent",
				amount: 10000,
				date: "3/1/2016",
				modeofpayment : "electronic_transfer",
				notes: "Paid rent for the month of December 2015",
				type : "expense"
			},
			{
				transactionid : 5,
				payer : "self",
				payee : "ABC",
				category : "grocery",
				subcategory : "fruits",
				amount: 150,
				date: "6/1/2016",
				modeofpayment : "cash",
				notes: "Apples",
				type : "expense"
			}
		];
		
		$scope.toggleIncExpState = null;
		$scope.totalIncome = 0;
		$scope.totalExpense = 0;
		angular.forEach($scope.income, function(value, key){
			$scope.totalIncome = $scope.totalIncome + value.amount;
		});
		angular.forEach($scope.expenses, function(value, key){
			$scope.totalExpense = $scope.totalExpense + value.amount;
		});
	}]);
	
}());


