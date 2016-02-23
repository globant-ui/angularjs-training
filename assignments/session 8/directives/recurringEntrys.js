angular.module("expenceManager").directive("recurringEntrys", [ 'httpInterceptor', '$log', function(httpInterceptor, $log){
		return{
			templateUrl:"directives/recurringEntrys.html",
			restrict: "AEC",
			scope:{
				expType: "@"
			},
			controller: function($scope){
				function getRecurringData(){
					httpInterceptor.CRUD("get",{}, "recurring").then(
						function (response){
							//$log.log("success get recurring", response);
							$scope.listData = response.data;
						},
						function (error){
							$log.log("Error get recurring",error);
						}
					);
				}
				getRecurringData();
				$scope.deleteRecurringEntry = function(listNode){
					httpInterceptor.CRUD("delete", listNode, "recurring").then(
						function (response){
							//$log.log("success deleteRecurringEntry",response);
							getRecurringData();
						},
						function (error){
							$log.log("error deleteRecurringEntry",error);
						}
					);
				}
			}
		}
	}]);