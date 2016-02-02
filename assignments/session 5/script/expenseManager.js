//script for expense manager

(function(){
	
	angular.module('expenceManager').controller('expenceController', ['$scope', '$log', 'httpInterceptor', 'addIncomeOrExpenseService', 'deleteIncomeOrExpenseService', 'editIncomeOrExpenseService', '$http', function($scope, $log, httpInterceptor, addIncomeOrExpenseService, deleteIncomeOrExpenseService, editIncomeOrExpenseService, $http){
		$scope.income =[];
		$scope.expenses = [];
		
		httpInterceptor.CRUD("get",{}).then(
			function (response){
				//$log.log("success get response",response.data);
				$scope.income = response.data.income;
				$scope.expenses = response.data.expense;
				$scope.transactionId = parseInt(response.data.transactionId);
				$scope.calculateBalance();
			},
			function (error){
				$log.log("Error get",error);
			}
		);
		
		$scope.toggleShowIncExpState = null;
		$scope.toggleAddIncExpState = null;
		$scope.calculateBalance = function(){
			$scope.totalIncome = 0;
			$scope.totalExpense = 0;
			angular.forEach($scope.income, function(value, key){
				$scope.totalIncome = parseInt($scope.totalIncome) + parseInt(value.amount);
			});
			angular.forEach($scope.expenses, function(value, key){
				$scope.totalExpense = parseInt($scope.totalExpense) + parseInt(value.amount);
			});
			$scope.totalBalance= parseInt($scope.totalIncome)-parseInt($scope.totalExpense);
		}
		
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
			addIncomeOrExpenseService.save($scope, 'income');
		}
		
		$scope.updateExpense = function(){
			addIncomeOrExpenseService.save($scope, 'expense');
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
			$scope.editPosition = position;
			if(node.type == "Expense"){
				$scope.editExpenseObj = angular.copy(node);
				$scope.editExpenseDetailsShow = true;
				$scope.updateEditExpense = function(){	
					editIncomeOrExpenseService.editIncExpSvr($scope, node, position);
				}
			}
			else if(node.type == "Income"){
				$scope.editIncomeObj = angular.copy(node);
				$scope.editIncomeDetailsShow = true;
				$scope.updateEditIncome = function(){
					editIncomeOrExpenseService.editIncExpSvr($scope, node, position);
				}
			}
		}
	}]);
	
}());


