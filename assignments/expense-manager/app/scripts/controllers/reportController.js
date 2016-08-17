angular.module("expenseManagerApp").controller("showReportController",['$scope','CRUD','$location','$rootScope','MODE_OF_PAYMENT','CATEGORY','SUB_CATEGORY',function($scope,CRUD,$location,$rootScope,MODE_OF_PAYMENT,CATEGORY,SUB_CATEGORY){

	if($rootScope.routes != $location.$$path){
		$rootScope.routes = $location.$$path;
	}	
	
	$scope.MODE_OF_PAYMENT = MODE_OF_PAYMENT;
	$scope.CATEGORY = CATEGORY;
	$scope.selectedFilter = [];
	
	//getting income data and sorting it depending on payer key
	$scope.incomeData = CRUD.getIncomeData();
	$scope.expenseData = CRUD.getExpenseData();

	function getServerData(type){
		if(type == 'income'){
			$scope.data_source = CRUD.incomeUrl;
		} else if(type == 'expense'){
			$scope.data_source = CRUD.expenseUrl;
		}
		CRUD.getIncomeExpenseData($scope)
		.then(function(data){
			if(typeof data === 'object') {
				if(type == 'income'){
					$scope.incomeData = data;
					CRUD.storeIncomeData($scope);
				} else if(type == 'expense'){
					$scope.expenseData = data;
					CRUD.storeExpenseData($scope);
				}
				
			} 
		});	
	}
	
	//getting data if direct url is accessed for income and expense
	if(Object.keys($scope.incomeData).length === 0){
		getServerData('income');
		
	} 

	if(Object.keys($scope.expenseData).length === 0){
		getServerData('expense');
	}

	$scope.setSelectedFilter = function (filter) {
 		var id = filter;
        if (_.contains($scope.selectedFilter, id)) {
            $scope.selectedFilter = _.without($scope.selectedFilter, id);
        } else {
            $scope.selectedFilter.push(id);
            
        }
        return false;
    };

    $scope.isChecked = function (id) {
    	if (_.contains($scope.selectedFilter, id)) {
           	return 'glyphicon glyphicon-ok';
        }
        return false;
    };

}]);