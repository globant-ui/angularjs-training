myApp.controller("commonController", ['transactionService', 'recurringTransactionService', '$location', '$scope', '$timeout', function(transactionService, recurringTransactionService, $location, $scope, $timeout) {

        $scope.amountData = {
            "totalIncomeAmount": 0, "totalExpenseAmount": 0, "availableBalance": 0
        };
        
        //get reccurring transaction list
        $scope.recurringTransactionList = recurringTransactionService.filterRecurringTransactionList();

        //get transaction data from srvice
        var transactionsSuccess = function(respData) {
            $scope.transactionDetails = transactionService.getTransactionList();
        }
        var transactionsFailure = function() {
            //Do nothing.
            console.log("Failed to get trancations..");
        }
        transactionService.getTransactionData().then(transactionsSuccess, transactionsFailure);

        //watch on amount data to update amount models aftr delete/edit operations
        $scope.$watch('transactionDetails', function(newVal, oldVal) {
            if (newVal != oldVal) {
                $scope.amountData.totalIncomeAmount = transactionService.sum($scope.transactionDetails, "amount", "Income");
                $scope.amountData.totalExpenseAmount = transactionService.sum($scope.transactionDetails, "amount", "Expense");
                $scope.amountData.availableBalance = $scope.amountData.totalIncomeAmount - $scope.amountData.totalExpenseAmount;
            }
        }, true);
        
        $scope.loadAddTransactionView = function() {
            $location.path('/addtransaction');
        };
        $scope.loadIncomeTable = function() {
            $location.path('/viewincometable');
        };
        $scope.loadExpenseTable = function() {
            $location.path('/viewexpensetable');
        };
        $scope.loadReportsPage = function() {
            $location.path('/reports');
        };
        $scope.home = function() {
            $location.path('/');
        };

    }]);