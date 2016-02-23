/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

myApp.controller("mainController", ['transactionService', 'recurringTransactionService', '$location', '$scope', '$timeout', function(transactionService, recurringTransactionService, $location, $scope, $timeout) {

        $scope.descending = false;
        $scope.editTransactionFlag = false;
        $scope.transaction = {};
        $scope.amountData = {
            "totalIncomeAmount": 0, "totalExpenseAmount": 0, "availableBalance": 0
        };
        
        //sort income/expense table by column
        $scope.sortBy = function(columnName) {
            $scope.column = columnName;
            $scope.descending = !$scope.descending;
        };
        
        $scope.transactionDetails = transactionService.getTransactionList();
        transactionService.setTransactionAmountData($scope.amountData);

        $scope.editTransaction = function(transaction) {
            $location.path('/edittransaction');
            transactionService.editTransaction(transaction, $scope.amountData);
            $scope.transactionDetails = transactionService.getTransactionList();
        };

        $scope.deleteTransaction = function(transaction) {
            var amountData = transactionService.deleteTransaction(transaction, $scope.amountData);
            transactionService.setTransactionAmountData(amountData);
            $scope.amountData = transactionService.getTransactionAmountData();
            $scope.transactionDetails = transactionService.getTransactionList();
        };
    }]);
