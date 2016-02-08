/**
 * @desc Controller for the expenses
 * @namespace ExpenseCtrl
 */

(function () {
    'use strict';
    expenseMngrApp.controller('ExpenseCtrl', ['$scope', 'expenseService',
    function ($scope, expenseService) {

            /**
             * @desc Array of expenses object
             * @memberOf ExpenseCtrl
             */
            $scope.expenseArray;
            var promise = expenseService.getExpenseDetails();
            promise.then(function (data) {
                $scope.expenseArray = data.data;
            });

            $scope.composeData = {};
            $scope.editable = false;

            $scope.compose = function (transaction) {
                $scope.editable = true;
                $scope.composeData = transaction;
            };

            $scope.saveComposition = function () {
                    $scope.editable = false;
                }
            // Adding Expense

            $scope.newListing = {};
            $scope.addExpense = function (newListing) {
                $scope.expenseArray.push(newListing);
                $scope.newListing = {};
                $scope.expVisible = false;
            }
            $scope.expVisible = false;
            $scope.AddNewExpenseBtn = function () {
                $scope.expVisible = true;
            }

            // Removing expense
            $scope.removeExpense = function (index) {
                $scope.expenseArray.splice(index, 1);
            }

    }]);
})();