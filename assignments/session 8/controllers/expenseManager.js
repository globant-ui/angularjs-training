//script for expense manager
(function(){
	angular.module('expenceManager').controller('expenceController', ['$scope', '$log', 'httpInterceptor', 'addIncomeOrExpenseService', 'deleteIncomeOrExpenseService', 'editIncomeOrExpenseService', '$http', '$location', function($scope, $log, httpInterceptor, addIncomeOrExpenseService, deleteIncomeOrExpenseService, editIncomeOrExpenseService, $http, $location){
		$scope.income =[];
		$scope.expenses = [];
		
		$scope.fetchData = function(){
			httpInterceptor.CRUD("get",{}, "income").then(
				function (response){
					//$log.log("success get response",response.data);
					 $scope.income = response.data;
					 $scope.calculateBalance();
				},
				function (error){
					$log.log("Error get income",error);
				}
			);
			httpInterceptor.CRUD("get",{}, "expense").then(
				function (response){
					//$log.log("success get response",response.data);
					 $scope.expenses = response.data;
					 $scope.calculateBalance();
				},
				function (error){
					$log.log("Error get expense",error);
				}
			);
		}
		$scope.fetchData();
		
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
			$scope.addIncomeFormToggle = true;
			$scope.addIncomeObj = {};
			$scope.addIncomeObj.type = "Income";
		}
		$scope.addExpense = function(){
			$scope.addExpenseFormToggle = true;
			$scope.addExpenseObj = {};
			$scope.addExpenseObj.type = "Expense";
			//$scope.addExpenseDetailsForm.$setUntouched();
		}
				
		$scope.updateIncome = function(){
			addIncomeOrExpenseService.save($scope, 'income');
		}
		
		$scope.updateExpense = function(){
			addIncomeOrExpenseService.save($scope, 'expense');
		}
		
		$scope.showIncome = function(){
			$scope.editIncomeDetailsShow = false;
			$scope.editExpenseDetailsShow = false;
		}
		$scope.showExpense = function(){
			$scope.editIncomeDetailsShow = false;
			$scope.editExpenseDetailsShow = false;
		}
		$scope.deleteNode = function(node){
			deleteIncomeOrExpenseService.remove($scope, node);
		}

		$scope.editNode = function(node){
			if(node.type == "Expense"){
				$scope.editExpenseObj = angular.copy(node);
				$scope.editExpenseDetailsShow = true;
				$scope.updateEditExpense = function(){	
					editIncomeOrExpenseService.save($scope, node);
				}
			}
			else if(node.type == "Income"){
				$scope.editIncomeObj = angular.copy(node);
				$scope.editIncomeDetailsShow = true;
				$scope.updateEditIncome = function(){
					editIncomeOrExpenseService.save($scope, node);
				}
			}
		}
		$scope.recurringEntryObj = {};
		$scope.addRecurringEntry = function(){
			$scope.recurringEntryObj.date = angular.element("#incomedatetimepicker5").val();
			//$log.log("$scope.recurringEntryObj",$scope.recurringEntryObj);
			httpInterceptor.CRUD("post", $scope.recurringEntryObj, "recurring").then(
				function (response){
					//$log.log("success addRecurringEntry", response);
					$scope.recurringEntryObj = {};
					$location.path('/')
				},
				function (error){
					$log.log("error addRecurringEntry",error);
				}
			);
		}
	}]);
}());