angular.module("expenseManagerApp").directive('notificationPanel',function(){
	return {
		restrict: 'E',
		scope: true,
		templateUrl: 'views/directives/notification/showRecurringDetails.html'
	};
});