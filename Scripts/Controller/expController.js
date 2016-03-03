'use strict';
app.controller('ExpenseCtrl', ['$scope', 'expenseService',
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

            $scope.expDetailsEdit = {};
            $scope.editable = false;

            $scope.compose = function (transaction) {
                $scope.editable = true;
                $scope.expVisible = false;
                $scope.expDetailsEdit = transaction;
            };

            $scope.saveComposition = function () {
                    $scope.editable = false;
                }
            // Adding Expense

            $scope.newListing = {};
            $scope.addExpense = function (newListing) {
                $scope.expenseArray.push(newListing);
                $scope.newListing = {};
                $scope.expDetails = {};
                $scope.expVisible = false;
                
            }
            $scope.expVisible = false;
            $scope.AddNewExpenseBtn = function () {
                $scope.expVisible = true;
                $scope.editable = false;
          
            }

            // Removing expense
            $scope.removeExpense = function (index) {
                $scope.expenseArray.splice(index, 1);
            }

    }]);