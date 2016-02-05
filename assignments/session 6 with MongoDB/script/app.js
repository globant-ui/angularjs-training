(function(){
	var myApp,
		name = "expenceManager",
		dependencies = ["ngRoute"];
	myApp = angular.module(name, dependencies);
		
	myApp.config(function($routeProvider){
		$routeProvider
			.when("/addIncome", {
				templateUrl: "partials/addIncome.html"
			})
			.when("/addExpense",{
				templateUrl: "partials/addExpense.html"
			})
			.when("/showIncome",{
				templateUrl:"partials/showIncome.html"
			})
			.when("/showExpense",{
				templateUrl:"partials/showExpense.html"
			})
			.otherwise({
				redirectTo:"/"
			})
	});
	myApp.factory("httpInterceptor", ['$http', '$log', '$q', function($http, $log, $q){
		return{
			CRUD: function(action, data, type){
				 var deferred = $q.defer();
				 var url = "https://api.mongolab.com/api/1/databases/my-expense/collections/"+type;
				 var config = {
					params:{
						apiKey:"PoNM7e8qtgeQVbTNQA8X_RM77Iq3oPoX"
					}
				 };
				 if(action == "get"){
					 $http.get(url, config).then(
						function(response){
							deferred.resolve(response);
						},
						function(response){
							deferred.reject(response);
						}
					);	
				 }
				 else if(action == "put"){
					 $http.put(url + "/" + data._id.$oid, data, config).then(
						function(response){
							deferred.resolve(response);
						},
						function(response){
							deferred.reject(response);
						}
					);
				 }
				 else if(action == "post"){
					 $http.post(url, data, config).then(
						function(response){
							deferred.resolve(response);
						},
						function(response){
							deferred.reject(response);
						}
					);
				 }
				 else if(action == "delete"){
					 $http.delete(url + "/" + data._id.$oid, config).then(
						function(response){
							deferred.resolve(response);
						},
						function(response){
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
	
	myApp.factory("deleteIncomeOrExpenseService", ['httpInterceptor', '$log', function(httpInterceptor, $log){
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
	
	myApp.factory("editIncomeOrExpenseService", ['httpInterceptor','$log', function(httpInterceptor, $log){
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
}());