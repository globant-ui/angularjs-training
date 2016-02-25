/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
myApp.controller("addTransactionController", ['transactionService', '$location', '$scope', function(transactionService, $location, $scope) {
        $scope.transaction = {};
        $scope.addTransaction = function() {
            $scope.transaction.transactionID = transactionService.generateTransactionId();
            var amountData = transactionService.addTransaction($scope.transaction, $scope.amountData);
            $scope.transaction = {};
            transactionService.setTransactionAmountData(amountData);
            $scope.transactionDetails = transactionService.getTransactionList();
        };

    }]);


