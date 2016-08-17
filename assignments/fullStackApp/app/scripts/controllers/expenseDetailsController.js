angular.module('myApp').controller('ExpenseDetailsCtrl',function($scope,$ngBootbox,$rootScope,$location,$timeout,updateService,PopupService) {
  $scope.user = {};
  $scope.master = {};
  
  /*Created expenses array*/
  $scope.expenses = updateService.getExpenseRecords();
  
  /*Created income array*/
  $scope.incomes = updateService.getIncomeRecords();

  updateService.listIncome();

  $scope.deleteExpenseRecord = function(expense) {
    	
    	var popupOption = PopupService.getPopupOptions('Are you sure you want to delete this record ?', 'DELETE', 'CANCEL', function () {

        updateService.delete($scope.expenses,expense);
        $scope.$apply()
      }, undefined);

      $ngBootbox.customDialog(popupOption);
        
    }

  $scope.editExpenseRecord = function(expense) {
    console.log("broadcasted");
    
    $location.path('/addDetails');

    $timeout(function() {
      $rootScope.$broadcast('record edited', expense);
        console.log('update with timeout fired')
    }, 300);
    
  }  

  $scope.$watch($scope.searchText, function(newValue,oldValue){
    
  });
});


