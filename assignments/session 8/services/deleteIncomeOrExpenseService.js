angular.module("expenceManager").factory("deleteIncomeOrExpenseService", ['httpInterceptor', '$log', function(httpInterceptor, $log){
		return{
			remove : function($scope, node){
				if(node.type == "Expense"){
					httpInterceptor.CRUD("delete", node, "expense").then(
						function (response){
							//$log.log("success remove expense",response.data);
							$scope.fetchData();
							$scope.calculateBalance();
						},
						function (error){
							$log.log("error remove expense",error);
						}
					);
				}
				else if(node.type == "Income"){
					httpInterceptor.CRUD("delete", node, "income").then(
						function (response){
							//$log.log("success remove income",response);
							$scope.fetchData();
							$scope.calculateBalance();
						},
						function (error){
							$log.log("error remove income",error);
						}
					);
				}
			}
		}
	}]);