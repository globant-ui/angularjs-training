(function(){
var ExpenseManager = angular.module('ExpenseManager',[]);

	ExpenseManager.controller('ExpenseCtrl', function($scope){

		$scope.expense = [{id : 1, amount : 10000,category : "Rent", date : "5 Jan 2016", mode : "Cheque"},
						  {id : 2, amount : 10000,category : "Travel", date : "15 Jan 2016", mode : "Cash"},
						  {id : 3, amount : 5000,category : "Office", date : "20 Jan 2016", mode : "Credit"},
						  {id : 4, amount : 5000,category : "Studies", date : "25 Jan 2016", mode : "Debit"}
						 ];

		$scope.income = [{id: 1, source : "Salary", amount: 20000, date : "01 Jan 2016", mode : "Credit"},
						 {id: 2, source : "Business", amount: 10000, date : "10 Jan 2016", mode : "Cheque"},
						 {id: 3, source : "Interest", amount: 5000, date : "12 Jan 2016", mode : "Cheque"},
						 {id: 4, source : "Earned", amount: 5000, date : "20 Jan 2016", mode : "Cash"},
						 {id: 5, source : "Business", amount: 10000, date : "23 Jan 2016", mode : "Cheque"}
						 ];

		$scope.totalIncome = 0;
		$scope.totalExpense = 0;
		
		for(var i = 0 ; i < $scope.income.length; i++)
			$scope.totalIncome += $scope.income[i].amount; 

		for(var i = 0 ; i < $scope.expense.length; i++)
			$scope.totalExpense += $scope.expense[i].amount; 

		$scope.balance = $scope.totalIncome - $scope.totalExpense;
})

})();