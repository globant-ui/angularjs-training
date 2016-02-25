'use strict';

angular.module('ExpenseManager')
  .directive('recurringWidget', ['RecurringService', '$rootScope','$state', function(RecurringService, $rootScope,$state) {
        return {
        	restrict: 'A',
            scope: {
                 ngModel: '='
             },
             templateUrl: 'views/recurringNotif.html',
             link: function(scope, element, attrs) {
                 scope.deleteRecurringTransaction = function(index) {
                     RecurringService.deleteRecurringTransaction(index);
                 };
                 scope.addRecurringTransaction = function(index) {
                 	/*var state = $state.current;
                 	console.log($state.current);
                    */ RecurringService.addRecurringTransaction(index);
                    // $state.go(state.name);
                };
                 
                 $rootScope.$on('recurring transaction change', function() {
                     scope.ngModel = RecurringService.filterRecurringTransactions();
                 })
             }
         };
     }]);