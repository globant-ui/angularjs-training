/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



myApp.controller("editTransactionController", ['transactionService', '$location', '$scope', function(transactionService, $location, $scope) {
        $scope.editTransactionFlag = true;
        $scope.transaction = transactionService.getSelectedTransaction();
        $scope.setTransaction = function() {
            var transactionType1 = "Income"
            var updatedTransactionData = transactionService.setTransaction($scope.transaction, $scope.transaction.amountData);
            $scope.transaction = updatedTransactionData.updatedTransaction;
            $scope.editTransactionFlag = false;
            transactionService.setTransactionAmountData(updatedTransactionData.updatedAmountData);
            $scope.transactionDetails = transactionService.getTransactionList();
            if ($scope.transaction.type === transactionType1) {
                $location.path("/viewincometable");
            } else {
                $location.path("/viewexpensetable");
            }
            $scope.transaction = {};
        };
        //cancel edit transaction action
        $scope.cancelTransaction = function() {
            $scope.transaction = {};
            $scope.editTransactionFlag = false;
        };
    }]);