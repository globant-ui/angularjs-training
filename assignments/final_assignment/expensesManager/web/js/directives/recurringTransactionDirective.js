/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


myApp.directive('recurringTransactionWidget', ['recurringTransactionService', '$rootScope', function(recurringTransactionService, $rootScope) {
        return {
            restrict: 'A',
            scope: {
                ngModel: '='
            },
            templateUrl: 'views/recurringTransaction.html',
//            controller:'reccuringTransactionController',
            link: function(scope, element, attrs) {
                scope.deleteRecurringTransaction = function(index) {
                    recurringTransactionService.deleteRecurringTransaction(index);
                };
                scope.addRecurringTransaction = function(index) {
                    recurringTransactionService.addRecurringTransaction(index);
                };
                
                $rootScope.$on('recurringtransactionchange', function() {
                    scope.ngModel = recurringTransactionService.filterRecurringTransactionList();
                })
            }
        };
    }]);