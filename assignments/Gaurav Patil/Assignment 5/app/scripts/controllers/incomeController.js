angular.module("expensesApp").
controller('incomeController', function($rootScope,$scope,updateService,$http){
	$scope.income_array = [];
	$scope.income_array = updateService.income_array;

	$scope.editIncome = function(index) {
    $http({
        method: 'PUT',
        url: 'http://demo1941123.mockable.io/income',
        data: this.exp_temp
        }).then(function successCallback(response) {
            var message = response.data.message;
            alert(message);
        }, function errorCallback(response) {
            console.log("error");
       });

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