/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


myApp.controller("reportsController", ['transactionService', '$location', '$scope', '$filter', function(transactionService, $location, $scope, $filter) {
        $scope.transactionDetails = transactionService.getTransactionList();
        var amountData = transactionService.getTransactionAmountData();
        $scope.searchTransactionAmount = parseFloat(amountData.totalIncomeAmount + amountData.totalExpenseAmount);
        //on search text filter calculate the amount of searched category transactions
        $scope.filterData = function() {
            if ($scope.searchTransactionText !== "") {
                $scope.searchTransactionAmount = 0;
                _.each($scope.filteredTransactionArray, function(transaction) {
                    $scope.searchTransactionAmount = parseFloat($scope.searchTransactionAmount) + parseFloat(transaction.amount);
                });
            } else {
                $scope.searchTransactionAmount = parseFloat(amountData.totalIncomeAmount + amountData.totalExpenseAmount);
            }
        };
        
       //sort reports table by column
        $scope.sortBy = function(columnName) {
            $scope.column = columnName;
            $scope.descending = !$scope.descending;
        };
    }]);