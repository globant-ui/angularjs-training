angular.module('myApp').controller('ExpenseDetailsCtrl',function($scope,$ngBootbox,updateService,PopupService) {
  $scope.user = {};
  $scope.master = {};
  
  /*Created expenses array*/
  $scope.expenses = updateService.getExpenseRecords();
  
  /*Created income array*/
  $scope.incomes = updateService.getIncomeRecords();

  $scope.deleteExpenseRecord = function(expense) {
    	
    	var popupOption = PopupService.getPopupOptions('Are you sure you want to delete this record ?', 'DELETE', 'CANCEL', function () {

        updateService.delete($scope.expenses,expense);
        $scope.$apply()
      }, undefined);

      $ngBootbox.customDialog(popupOption);
        
    }
});


