/**
 * @desc Controller for the expenses
 * @namespace ExpenseCtrl
 */

(function () {
    'use strict';
    expenseMngrApp.controller('IncomeCtrl', ['$scope', 'incomeService',

    function ($scope, incomeService) {

            /**
             * @desc Array of expenses object
             * @memberOf ExpenseCtrl
             */

            $scope.incomeArray;
            var promise = incomeService.getIncomeDetails();
            promise.then(function (data) {
                $scope.incomeArray = data.data;
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

            // Add Income

            $scope.incomeVisible = false;
            /*function To show the add income form*/
            $scope.AddNewIncomeBtn = function () {
                $scope.incomeVisible = true;
            }

            $scope.newListing = {};
            $scope.addIncome = function (newListing) {
                $scope.incomeArray.push(newListing);
                $scope.newListing = {};
                $scope.incomeVisible = false;
            }

            // Removing Income
            $scope.removeIncome = function (index) {
                $scope.incomeArray.splice(index, 1);
            }

    }]);
})();