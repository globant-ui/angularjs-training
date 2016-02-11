'use strict'
angular.module('ExpenseManager')
  .controller('showIncomeCtrl', function ($scope, $rootScope,ExpenseService,editDeleteService) {
  	
  	$scope.income = ExpenseService.income;
  	
  	$scope.$on('income added',function(event,amt){
  		$scope.income = ExpenseService.income;	
  	});

  	$scope.$on('income updated',function(event, newAmt,oldAmt){
  		$scope.income = ExpenseService.income;	
  	});

  	$scope.deleteExp = function(index, amountTobeDeducted){
			ExpenseService.deleteTransaction(index,true);
  			$rootScope.$broadcast('income deleted',amountTobeDeducted);
  			$scope.income = ExpenseService.income;
		};

		$scope.EnableEdit = function(exp, index){
				
				editDeleteService.EnableEdit(exp,index);
				$rootScope.$broadcast('Enable Edit');
		};
});