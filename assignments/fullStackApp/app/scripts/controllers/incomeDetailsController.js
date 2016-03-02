'use strict';

/**
 * @ngdoc function
 * @name iemApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the iemApp
 */


/**
Defined income details controller
*/
angular.module('myApp').controller('IncomeDetailsCtrl',function($scope,updateService) {
  $scope.user = {};
  $scope.master = {};
  
  /**Function to delete income record
    @param: income record object for deletion
  */
    $scope.deleteIncomeRecord = function(income) {
        updateService.delete($scope.incomes,income);
    }

    /** Function to reset from values*/
    $scope.reset = function() {
        $scope.user = angular.copy($scope.master);
    };
  /*Created expenses array*/
  $scope.expenses = updateService.getExpenseRecords();
  
  /*Created income array*/
  $scope.incomes = updateService.getIncomeRecords();
    
});

