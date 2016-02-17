angular.module('myAppApp')
.controller('CalCtrl', function ($scope, incomeService, expenseService) {
    $scope.showModal = false;
    $scope.totalIncome = 0;
    $scope.totalExpense = 0;
    $scope.totalBalance = $scope.totalIncome + $scope.totalExpense;
    
    var IncomeData;
    var ExpenseData;
    
    IncomeData = incomeService.postData(null);
    ExpenseData =  expenseService.postData(null);
    
    $scope.toggleModal = function(){
        $scope.showModal = !$scope.showModal;
    }
    
    $scope.calculateIncome = function(){
        console.log("sdsd");
        IncomeData.forEach(function(element) {
            $scope.totalIncome = $scope.totalIncome + element.amount;
        }, this);
    }
    
    $scope.calculateExpense = function(){
        ExpenseData.forEach(function(element) {
            $scope.totalExpense = $scope.totalExpense + element.amount;
        }, this);
    }
    
    // $scope.calculateBalance = function(){
    //     $scope.totalBalance = $scope.totalIncome + $scope.
    // }
    
    $scope.calculateIncome();
    $scope.calculateExpense();
    
  });