angular.module("expenceManager").factory("editIncomeOrExpenseService", ['httpInterceptor','$log', function(httpInterceptor, $log){
		return{
			save : function($scope, node){
				if(node.type == "Expense"){
					$scope.editExpenseObj.date = angular.element("#editexpensedatetimepicker4").val();
					httpInterceptor.CRUD("put", $scope.editExpenseObj, "expense").then(
						function (response){
							//$log.log("success put expense",response);
							$scope.fetchData();
							$scope.calculateBalance();
						},
						function (error){
							$log.log("error put expense",error);
						}
					);
					$scope.editExpenseDetailsShow = false;
				}
				else if(node.type == "Income"){
					$scope.editIncomeObj.date = angular.element("#editincomedatetimepicker4").val();
					httpInterceptor.CRUD("put", $scope.editIncomeObj, "income").then(
						function (response){
							//$log.log("success put income",response);
							$scope.fetchData();
							$scope.calculateBalance();
						},
						function (error){
							$log.log("error put income",error);
						}
					);
					$scope.editIncomeDetailsShow = false;
				}
			}
		}
	}]);