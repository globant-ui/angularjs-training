//script for expense manager

(function(){
	var myApp,
		name = "expenceManager",
		dependencies = [];
	myApp = angular.module(name, dependencies);
	
	myApp.controller('expenceController', ['$scope', '$log', function($scope, $log){
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
		
		
		$scope.transactionId = 6;
		// $scope.addIncomeObj = {};
		// $scope.addExpenseObj = {};
		$scope.addIncome = function(){
			$scope.toggleShowIncExpState = null;
			$scope.toggleAddIncExpState = true;
			$scope.addIncomeObj = {};
			$scope.addIncomeObj.transactionid = $scope.transactionId;
			$scope.addIncomeObj.type = "Income";
			$scope.addIncomeDetailsForm.$setUntouched();
		}
		$scope.addExpense = function(){
			$scope.toggleShowIncExpState = null;
			$scope.toggleAddIncExpState = false;
			$scope.addExpenseObj = {};
			$scope.addExpenseObj.transactionid = $scope.transactionId;
			$scope.addExpenseObj.type = "Expense";
			$scope.addExpenseDetailsForm.$setUntouched();

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
		
		$scope.updateIncome = function(){
			$scope.transactionId++;
			$scope.addIncomeObj.date = angular.element("#incomedatetimepicker4").val();
			$scope.income.push($scope.addIncomeObj);
			$scope.calculateBalance();
			$scope.toggleAddIncExpState = null;
			document.getElementById("addIncomeForm").reset();
		}
		
		$scope.updateExpense = function(){
			$scope.transactionId++;
			$scope.addExpenseObj.date = angular.element("#expensedatetimepicker4").val();
			$scope.expenses.push($scope.addExpenseObj);
			$scope.calculateBalance();
			$scope.toggleAddIncExpState = null;
			document.getElementById("addExpenseForm").reset();
		}
		
		$scope.deleteNode = function(node){
			$log.log("deleteNode",node);
			if(node.type == "Expense"){
				angular.forEach($scope.expenses, function(value, key){
					if(value.transactionid == node.transactionid){
						$scope.expenses.splice(key,1);
						$scope.calculateBalance();
					}
				});
			}
			else if(node.type == "Income"){
				angular.forEach($scope.income, function(value, key){
					if(value.transactionid == node.transactionid){
						$scope.income.splice(key,1);
						$scope.calculateBalance();
					}
				});
			}
		}
		$scope.editIncomeDetailsShow = false;
		$scope.editExpenseDetailsShow = false;
		$scope.editNode = function(node, location){

			if(node.type == "Expense"){
				$scope.editExpenseObj = angular.copy(node);
				$scope.editExpenseDetailsShow = true
				$log.log("$scope.editExpenseObj",$scope.editExpenseObj);
				$scope.updateEditExpense = function(){
					$scope.editExpenseObj.date = angular.element("#editexpensedatetimepicker4").val();
					$scope.expenses[location] = angular.copy($scope.editExpenseObj);
					$scope.calculateBalance();
					$scope.editExpenseDetailsShow = false;
				}
			}
			else if(node.type == "Income"){
				$scope.editIncomeObj = node;
				$scope.editIncomeDetailsShow = true
				$log.log("$scope.editIncomeObj",$scope.editIncomeObj);
				$scope.updateEditIncome = function(){
				    $scope.editIncomeObj.date = angular.element("#editincomedatetimepicker4").val();
					$scope.income[location] = angular.copy($scope.editIncomeObj);
					$scope.calculateBalance();
					$scope.editIncomeDetailsShow = false;
				}
			}
		}
		
		
	}]);
	
}());


