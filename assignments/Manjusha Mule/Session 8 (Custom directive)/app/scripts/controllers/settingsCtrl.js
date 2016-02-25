'use strict'
angular.module('ExpenseManager')
  .controller('SettingsCtrl', function ($scope,ExpenseService,RecurringService) {
  	$scope.recurring = {amount : "",
						category : "",
						date : new Date(),
						type : "",
						note : ""};

	$scope.addRecurring = function(){
		var d = $scope.recurring.date;
		$scope.recurring.date = new Date(d);
		
		RecurringService.setRecurringTransaction($scope.recurring);		
		
		$scope.recurring = {amount : "",
						category : "",
						date : new Date(),
						type : "",
						note : ""};
		$scope.detailsForm.$setPristine();
	}

  });