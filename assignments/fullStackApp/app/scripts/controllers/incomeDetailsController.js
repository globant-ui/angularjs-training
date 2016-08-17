'use strict';

/**
 * @ngdoc function
 * @name iemApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the myApp
 */


/**
Defined income details controller
*/
angular.module('myApp').controller('IncomeDetailsCtrl',function($scope,$ngBootbox,$rootScope,$location,$timeout,updateService,PopupService) {
  $scope.user = {};
  $scope.master = {};
  
    /** Function to reset from values*/
    $scope.reset = function() {
        $scope.user = angular.copy($scope.master);
    };
  /*Created expenses array*/
  $scope.expenses = updateService.getExpenseRecords();
  
  /*Created income array*/
  $scope.incomes = updateService.getIncomeRecords();

  /**Function to delete income record
    @param: income record object for deletion
  */
  $scope.deleteIncomeRecord = function(income) {
      
      var popupOption = PopupService.getPopupOptions('Are you sure you want to delete this record ?', 'DELETE', 'CANCEL', function () {

        updateService.delete($scope.incomes,income);
        $scope.$apply()
      }, undefined);

      $ngBootbox.customDialog(popupOption);
        
    }

    $scope.editIncomeRecord = function(income) {
    console.log("broadcasted");
    
    $location.path('/addDetails');

    $timeout(function() {
      $rootScope.$broadcast('record edited', income);
        console.log('update with timeout fired')
    }, 300);
    
  }  
    
});

