angular.module("expensesApp").
controller('incomeController', function($rootScope,$scope,updateService){
	$scope.income_array = [];
	$scope.income_array = updateService.income_array;

	$scope.editIncome = function(index) {
        updateService.index = index;
        updateService.income_temp = $scope.income_array[index];
        $rootScope.$broadcast('incomeDetails');
    }

    $scope.deleteIncome = function(index) {
	    updateService.index = index;	
	    updateService.deleteIncome();
	    $scope.income_array = updateService.income_array;
    };

});