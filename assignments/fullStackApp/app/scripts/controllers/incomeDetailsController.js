'use strict';

/**
 * @ngdoc function
 * @name iemApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the iemApp
 */



angular.module('myApp').controller('IncomeDetailsCtrl',function($scope,updateService) {
  $scope.user = {};
  $scope.master = {};
  
    $scope.deleteIncomeRecord = function(income) {
        updateService.delete($scope.incomes,income);
    }

    $scope.reset = function() {
        $scope.user = angular.copy($scope.master);
    };
  /*Created expenses array*/
  $scope.expenses = updateService.getExpenseRecords();
  
  /*Created income array*/
  $scope.incomes = updateService.getIncomeRecords();
    
});

