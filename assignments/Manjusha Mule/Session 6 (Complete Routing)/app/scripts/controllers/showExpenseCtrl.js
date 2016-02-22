'use strict'
angular.module('ExpenseManager')
  .controller('showExpenseCtrl', function ($scope, $rootScope,ExpenseService,editDeleteService) {
  	
  	$scope.expense = ExpenseService.expense;
  	
  	$scope.$on('Expense added',function(event,amt){
  		$scope.expense = ExpenseService.expense;	
  	});

  	$scope.$on('Expense updated',function(event, newAmt,oldAmt){
  		$scope.expense = ExpenseService.expense;	
  	});

  	$scope.deleteExp = function(index, amountTobeDeducted){
			ExpenseService.deleteTransaction(index,false);
  			$rootScope.$broadcast('Expense deleted',amountTobeDeducted);
  			$scope.expense= ExpenseService.expense;
		};

		$scope.EnableEdit = function(exp, index){
				
				editDeleteService.EnableEdit(exp,index);
				$rootScope.$broadcast('Enable Edit');
		};
});