angular.module('myApp').controller('ExpenseDetailsCtrl',function($scope,updateService) {
  $scope.user = {};
  $scope.master = {};
  

    $scope.deleteExpenseRecord = function(expense) {
        updateService.delete($scope.expenses,expense);
    }

  /*Created expenses array*/
  $scope.expenses = updateService.getExpenseRecords();
  
  /*Created income array*/
  $scope.incomes = updateService.getIncomeRecords();
});


