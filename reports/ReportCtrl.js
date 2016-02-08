/**
 *  Report Controller
 */
expenseMngrApp.controller("ReportCtrl", ["$scope", "incomeService", "expenseService", function ($scope, incomeService, expenseService) {
   
    // Income Category Total
    $scope.incomeCategories = [];
    $scope.incomeData;
    var promise = incomeService.getIncomeDetails();
    promise.then(function (data) {
        // Here data will return the complete response 
        // data.data will contain actual data 
        $scope.incomeData = data.data;

        
        for (var a in $scope.incomeData) {
            $scope.incomeCategories.push($scope.incomeData[a]["category"]);
        }
        $scope.catTotal = 0;
        $scope.summaryData = [];
        $scope.incomeCategories.forEach(function(item) {
            //alert("item :"+ item);
            for(var a in $scope.incomeData){
                if(item == $scope.incomeData[a]["category"] ) {
                    $scope.catTotal += $scope.incomeData[a]["amount"];
                }
               }
            $scope.summaryData.push({
                category:item,
                amount: $scope.catTotal
            })
            $scope.catTotal = 0;
        })
    });

    // Expense Total 
    $scope.expensecategories = [];
    $scope.expenseData;
    var expensePromise = expenseService.getExpenseDetails();
    expensePromise.then(function (data) {
        $scope.expenseData = data.data;

        
        for (var a in $scope.expenseData) {
             $scope.expensecategories.push($scope.expenseData[a]["category"]);
        }
        $scope.expenseCatTotal = 0;
        $scope.expSummaryData = [];
        $scope.expensecategories.forEach(function(item) {
            for(var a in $scope.expenseData){
                if(item == $scope.expenseData[a]["category"] ) {
                    $scope.expenseCatTotal += $scope.expenseData[a]["amount"];
                }
               }
            $scope.expSummaryData.push({
                category:item,
                amount: $scope.expenseCatTotal
            })
            $scope.expenseCatTotal = 0;
        })
    });

}]);