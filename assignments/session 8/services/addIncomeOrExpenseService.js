angular.module("expenceManager").factory("addIncomeOrExpenseService", ['httpInterceptor', '$log', function(httpInterceptor, $log){
		return {
			save : function($scope, type){
				if(type == "income"){
					$scope.addIncomeObj.date = angular.element("#incomedatetimepicker4").val();
					httpInterceptor.CRUD("post", $scope.addIncomeObj, "income").then(
						function (response){
							$scope.addIncomeFormToggle = false;
							$scope.fetchData();
							$scope.calculateBalance();
						},
						function (error){
							$log.log("error put response",error);
						}
					);
				}
				else if(type == "expense"){	
					$scope.addExpenseObj.date = angular.element("#expensedatetimepicker4").val();
					httpInterceptor.CRUD("post", $scope.addExpenseObj, "expense").then(
						function (response){
							$scope.addExpenseFormToggle = false;
							$scope.fetchData();
							$scope.calculateBalance();
						},
						function (error){
							$log.log("error put response",error);
						}
					);
				}
				$scope.toggleAddIncExpState = null;
			}
		}
	}]);