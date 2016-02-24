angular.module("expensesApp").
controller('expenseController', function($rootScope,$scope,updateService,$http){
	$scope.exp_array = [];
	$scope.exp_array = updateService.exp_array;

    $scope.editExpense = function(index) {
    $http({
        method: 'PUT',
        url: 'http://demo1941123.mockable.io/expense',
        data: this.exp_temp
        }).then(function successCallback(response) {
            var message = response.data.message;
            alert(message);
        }, function errorCallback(response) {
            console.log("error");
       });

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