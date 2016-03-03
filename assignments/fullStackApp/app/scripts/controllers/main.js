'use strict';

/**
 * @ngdoc function
 * @name iemApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the iemApp
 */



angular.module('myApp').controller('MainCtrl',function($scope,updateService) {
  $scope.user = {};
  $scope.master = {};

  /*Default selection*/
  $scope.user.category = "category1";
  $scope.user.subCategory = "subcategory1";
  $scope.user.amount = 0;
  $scope.user.modeOfPayment = "cash";
    /**
    Function to update income record
    @param: user record object to update
    */
    $scope.updateIncome = function(user) {
        console.log("update income"+$scope.userForm.$valid);
        var isUpdateIncome = true;
        if($scope.userForm.$valid) {
            updateService.update(isUpdateIncome,user);
            console.log("reset");
            $scope.reset();
        }else {
          alert("Form is invalid");
        }
    }

    /**
    Function to update expense record
    @param: user record object to update
    */
    $scope.updateExpense = function(user) {
        if($scope.userForm.$valid) {
            updateService.update(false,user);
            $scope.reset();
        } else {
          alert("Form is invalid ");
        }
    }


    $scope.submitForm = function() {
       /* var a = updateService.update();*/
        console.log("form submit called");
    }

    /**
    Function to reset form fields
    */
    $scope.reset = function() {
        $scope.user = angular.copy($scope.master);
    };
 /*Service call to get expense records*/
  $scope.expenses = updateService.getExpenseRecords();
  
  /*Service call to get income records*/
  $scope.incomes = updateService.getIncomeRecords();
});


