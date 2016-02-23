(function(){
	var myApp,
		name = "expenceManager",
		dependencies = [];
	myApp = angular.module(name, dependencies);
	
	myApp.service("addIncomeOrExpenseService", function(){
		return {
			saveIncome : function($scope){
				$scope.transactionId++;
				$scope.addIncomeObj.date = angular.element("#incomedatetimepicker4").val();
				$scope.income.push($scope.addIncomeObj);
				$scope.calculateBalance();
				$scope.toggleAddIncExpState = null;
			},
			saveExpense : function($scope){
				$scope.transactionId++;
				$scope.addExpenseObj.date = angular.element("#expensedatetimepicker4").val();
				$scope.expenses.push($scope.addExpenseObj);
				$scope.calculateBalance();
				$scope.toggleAddIncExpState = null;
			}
		}
	});
	
	myApp.service("deleteIncomeOrExpenseService", function(){
		return{
			deleteIncExpSvr : function($scope, node){
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
		}
	});
	
	myApp.service("editIncomeOrExpenseService", function(){
		return{
			editIncExpSvr : function($scope, node, position){
				if(node.type == "Expense"){
					$scope.editExpenseObj = angular.copy(node);
					$scope.editExpenseDetailsShow = true
					$scope.updateEditExpense = function(){
						$scope.editExpenseObj.date = angular.element("#editexpensedatetimepicker4").val();
						$scope.expenses[position] = angular.copy($scope.editExpenseObj);
						$scope.calculateBalance();
						$scope.editExpenseDetailsShow = false;
					}
				}
				else if(node.type == "Income"){
					$scope.editIncomeObj = angular.copy(node);
					$scope.editIncomeDetailsShow = true
					$scope.updateEditIncome = function(){
						$scope.editIncomeObj.date = angular.element("#editincomedatetimepicker4").val();
						$scope.income[position] = angular.copy($scope.editIncomeObj);
						$scope.calculateBalance();
						$scope.editIncomeDetailsShow = false;
					}
				}
			}
		}
	});
}());