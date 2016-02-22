'use strict'
angular.module('ExpenseManager')
  .controller('showIncomeCtrl', function ($scope, $rootScope,ExpenseService,editDeleteService) {
  	
  	$scope.income = ExpenseService.income;
  	
  	$scope.$on('income added',function(event,amt){
      
      var promise = ExpenseService.listIncome();
      promise.then(function successCallback(response) {
              console.log(response.data);
              $scope.income = ExpenseService.income;  
            }, function errorCallback(response) {
              console.log("error");
            });

  	
  	});

  	$scope.$on('income updated',function(event, newAmt,oldAmt){
  		var promise = ExpenseService.listIncome();
      promise.then(function successCallback(response) {
              console.log(response.data);
              $scope.income = ExpenseService.income;  
            }, function errorCallback(response) {
              console.log("error");
            });
  	});

  	$scope.deleteExp = function(index, amountTobeDeducted){
			ExpenseService.deleteTransaction(index,true);
  			$rootScope.$broadcast('income deleted',amountTobeDeducted);
  	
    		var promise = ExpenseService.listIncome();
        promise.then(function successCallback(response) {
              console.log(response.data);
              $scope.income = ExpenseService.income;  
            }, function errorCallback(response) {
              console.log("error");
            });
		};

		$scope.EnableEdit = function(exp, index){
				
				editDeleteService.EnableEdit(exp,index);
				$rootScope.$broadcast('Enable Edit');
		};
});