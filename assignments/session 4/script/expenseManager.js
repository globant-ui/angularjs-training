//script for expense manager

(function(){
	
	angular.module('expenceManager').controller('expenceController', ['$scope', '$log', 'addIncomeOrExpenseService', 'deleteIncomeOrExpenseService', 'editIncomeOrExpenseService', function($scope, $log, addIncomeOrExpenseService, deleteIncomeOrExpenseService, editIncomeOrExpenseService){
		$scope.income =[];
		$scope.expenses = [];
		
		$scope.toggleShowIncExpState = null;
		$scope.toggleAddIncExpState = null;
		$scope.calculateBalance = function(){
			$scope.totalIncome = 0;
			$scope.totalExpense = 0;
			angular.forEach($scope.income, function(value, key){
				$scope.totalIncome = $scope.totalIncome + value.amount;
			});
			angular.forEach($scope.expenses, function(value, key){
				$scope.totalExpense = $scope.totalExpense + value.amount;
			});
		}
		$scope.calculateBalance();
		$scope.transactionId = 1;
		$scope.addIncome = function(){
			$scope.toggleShowIncExpState = null;
			$scope.toggleAddIncExpState = true;
			$scope.addIncomeObj = {};
			$scope.addIncomeObj.transactionid = $scope.transactionId;
			$scope.addIncomeObj.type = "Income";
		}
		$scope.addExpense = function(){
			$scope.toggleShowIncExpState = null;
			$scope.toggleAddIncExpState = false;
			$scope.addExpenseObj = {};
			$scope.addExpenseObj.transactionid = $scope.transactionId;
			$scope.addExpenseObj.type = "Expense";
			$scope.addExpenseDetailsForm.$setUntouched();
		}
				
		$scope.updateIncome = function(){
			addIncomeOrExpenseService.saveIncome($scope);
		}
		
		$scope.updateExpense = function(){
			addIncomeOrExpenseService.saveExpense($scope);
		}
		
		$scope.showIncome = function(){
			$scope.toggleAddIncExpState = null;
			$scope.toggleShowIncExpState = true;
			$scope.editIncomeDetailsShow = false;
		}
		$scope.showExpense = function(){
			$scope.toggleAddIncExpState = null;
			$scope.toggleShowIncExpState = false;
			$scope.editExpenseDetailsShow = false;
		}
		
		$scope.deleteNode = function(node){
			deleteIncomeOrExpenseService.deleteIncExpSvr($scope, node);
		}
		$scope.editIncomeDetailsShow = false;
		$scope.editExpenseDetailsShow = false;
		$scope.editNode = function(node, position){
			editIncomeOrExpenseService.editIncExpSvr($scope, node, position);
		}
	}]);
	
}());


