angular.module('expensesApp')
  .directive('recurringWidget', ['RecurringService', '$rootScope', function(RecurringService, $rootScope) {
        return {
           restrict: 'A',
            scope: {
                 ngModel: '='
             },
             templateUrl: 'views/summary.html',
             link: function(scope, element, attrs) {
                
                 scope.deleteRecurringTransaction = function(index) {
                     RecurringService.deleteRecurringTransaction(index);
                 };
                 
             }
         };
     }]);