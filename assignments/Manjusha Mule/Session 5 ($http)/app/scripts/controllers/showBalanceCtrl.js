'use strict'
angular.module('ExpenseManager')
  .controller('showBalanceCtrl', function ($scope, ExpenseService, Balance) {
  	
  	$scope.total = Balance.total;
  	$scope.$on('income added',function(event,amt){
  		$scope.total.income+=parseInt(amt);	
  		updateBalance();
  	});

  	$scope.$on('income deleted',function(event,amt){
  		$scope.total.income-=parseInt(amt);	
  		updateBalance();
  	});
  	$scope.$on('income updated',function(event, newAmt, oldAmt){
  		$scope.total.income-=parseInt(oldAmt);	
  		$scope.total.income+=parseInt(newAmt);	
  		updateBalance();
  	});

  	$scope.$on('Expense added',function(event,amt){
  		$scope.total.expense+=parseInt(amt);	
  		updateBalance();
  	});

  	$scope.$on('Expense deleted',function(event,amt){
  		$scope.total.expense-=parseInt(amt);	
  		updateBalance();
  	});
  	$scope.$on('Expense updated',function(event, newAmt, oldAmt){
  		$scope.total.expense-=parseInt(oldAmt);	
  		$scope.total.expense+=parseInt(newAmt);	
  		updateBalance();
  	});

  	var updateBalance = function(){
  		$scope.total.balance = $scope.total.income - $scope.total.expense;
  	}
 });