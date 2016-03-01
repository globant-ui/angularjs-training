angular.module("expensesApp").
controller('expenseController', function($rootScope,$scope,updateService){
	$scope.exp_array = [];
	$scope.exp_array = updateService.exp_array;

    $scope.editExpense = function(index) {
        updateService.index = index;
        updateService.exp_temp = $scope.exp_array[index];
        $rootScope.$broadcast('expenseDetails');
    };
    $scope.deleteExpense = function(index) {
        updateService.index = index;    
        updateService.deleteExpense();
        $scope.exp_array = updateService.exp_array;
    };

});