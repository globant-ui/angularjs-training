(function(){
	var myApp,
		name = "expenceManager",
		dependencies = [];
	myApp = angular.module(name, dependencies);
	
	myApp.factory("httpInterceptor", ['$http', '$log', '$q', function($http, $log, $q){
		return{
			CRUD: function(action, data){
				 var deferred = $q.defer();
				 if(action == "get"){
					 $http.get("https://api.myjson.com/bins/39obd").then(
						function successCallBack(response){
							deferred.resolve(response);
						},
						function errorCallBack(response){
							deferred.reject(response);
						}
					 );		
				 }
				 else if(action == "put"){
					 $http.put("https://api.myjson.com/bins/39obd",data).then(
						function successCallBack(response){
							deferred.resolve(response);
						},
						function errorCallBack(response){
							deferred.reject(response);
						}
					 );
				 }
				 return deferred.promise;
			}
		}
	}]);
	
	myApp.factory("addIncomeOrExpenseService", ['httpInterceptor', function(httpInterceptor){
		return {
			save : function($scope, type){
				$scope.transactionId++;
				if(type == "income"){
					$scope.addIncomeObj.date = angular.element("#incomedatetimepicker4").val();
					$scope.income.push($scope.addIncomeObj);
				}
				else if(type == "expense"){		
					$scope.addExpenseObj.date = angular.element("#expensedatetimepicker4").val();
					$scope.expenses.push($scope.addExpenseObj);
				}
				$scope.calculateBalance();
				httpInterceptor.CRUD("put", {"income": $scope.income,"expense": $scope.expenses,"transactionId":$scope.transactionId}).then(
					function (response){
						//$log.log("success put response",response.data);
					},
					function (error){
						$log.log("error put response",response.status);
					}
				);
				$scope.toggleAddIncExpState = null;
			}
		}
	}]);
	
	myApp.factory("deleteIncomeOrExpenseService", ['httpInterceptor', function(httpInterceptor){
		return{
			deleteIncExpSvr : function($scope, node){
				if(node.type == "Expense"){
					angular.forEach($scope.expenses, function(value, key){
						if(value.transactionid == node.transactionid){
							$scope.expenses.splice(key,1);
						}
					});
				}
				else if(node.type == "Income"){
					angular.forEach($scope.income, function(value, key){
						if(value.transactionid == node.transactionid){
							$scope.income.splice(key,1);
						}
					});
				}
				
				$scope.calculateBalance();
				httpInterceptor.CRUD("put", {"income": $scope.income,"expense": $scope.expenses,"transactionId":$scope.transactionId}).then(
					function (response){
						//$log.log("success put response",response.data);
					},
					function (error){
						$log.log("error put response",response.status);
					}
				);
			}
		}
	}]);
	
	myApp.factory("editIncomeOrExpenseService", ['httpInterceptor', function(httpInterceptor){
		return{
			editIncExpSvr : function($scope, node, position){
				if(node.type == "Expense"){
					$scope.editExpenseObj.date = angular.element("#editexpensedatetimepicker4").val();
					$scope.expenses[$scope.editPosition] = angular.copy($scope.editExpenseObj);
					$scope.editExpenseDetailsShow = false;
				}
				else if(node.type == "Income"){
					$scope.editIncomeObj.date = angular.element("#editincomedatetimepicker4").val();
					$scope.income[$scope.editPosition] = angular.copy($scope.editIncomeObj);
					$scope.editIncomeDetailsShow = false;
				}
				$scope.calculateBalance();
				httpInterceptor.CRUD("put", {"income": $scope.income,"expense": $scope.expenses,"transactionId":$scope.transactionId}).then(
					function (response){
						//$log.log("success put response",response.data);
					},
					function (error){
						$log.log("error put response",response.status);
					}
				);
			}
		}
	}]);
}());