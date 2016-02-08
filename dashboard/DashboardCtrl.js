/**
 *  Dashboard Controller
 */
expenseMngrApp.controller("DashboardCtrl", ["$scope", "incomeService", "expenseService", function ($scope, incomeService, expenseService) {
    // Income Total
    $scope.incomeData;
    var promise = incomeService.getIncomeDetails();
    promise.then(function (data) {
        // Here data will return the complete response 
        // data.data will contain actual data 
        $scope.incomeData = data.data;

        $scope.incomeTotal = 0;
        for (var a in $scope.incomeData) {
            $scope.incomeTotal += parseFloat($scope.incomeData[a]["amount"]);
        }

    });

    // Expense Total 
    $scope.expenseData;
    var expensePromise = expenseService.getExpenseDetails();
    expensePromise.then(function (data) {
        $scope.expenseData = data.data;

        $scope.expenseTotal = 0;
        for (var a in $scope.expenseData) {
            $scope.expenseTotal += parseFloat($scope.expenseData[a]["amount"]);
        }
    });

}]);