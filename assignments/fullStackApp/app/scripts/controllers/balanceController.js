angular.module('myApp').controller('balanceCtrl',function($scope,updateService) {

  	$scope.totalIncome = 0;
	$scope.totalExpense = 0;

	 /*get expense*/
    $scope.expenses = updateService.getExpenseRecords();
  
     /*get income */
    $scope.incomes = updateService.getIncomeRecords();


	$scope.calculateBalance = function(){
			$scope.totalIncome = 0;
			$scope.totalExpense = 0;
			angular.forEach($scope.incomes, function(value, key){
				$scope.totalIncome = parseInt($scope.totalIncome) + parseInt(value.amount);
			});
			angular.forEach($scope.expenses, function(value, key){
				$scope.totalExpense = parseInt($scope.totalExpense) + parseInt(value.amount);
			});
			$scope.totalBalance= parseInt($scope.totalIncome)-parseInt($scope.totalExpense);
		}

	$scope.calculateBalance();

	$scope.$on('update found',function(event){
  		$scope.calculateBalance();
  	});
});


