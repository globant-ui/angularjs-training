

    'use strict';
    app.controller('IncomeCtrl', ['$scope', 'incomeService',

    function ($scope, incomeService) {
            
        
            $scope.expDetails = {};
            $scope.incomeArray;
            var promise = incomeService.getIncomeDetails();
            promise.then(function (data) {
                $scope.incomeArray = data.data;
            });

            $scope.expDetailsEdit = {};
            $scope.editable = false;

            $scope.compose = function (transaction) {
                $scope.editable = true;
                $scope.incomeVisible = false;
                $scope.expDetailsEdit = transaction;
            };

            $scope.saveComposition = function () {
                $scope.editable = false;
            }

            // Add Income

            $scope.incomeVisible = false;
            /*function To show the add income form*/
            $scope.AddNewIncomeBtn = function () {
                $scope.incomeVisible = true;
                $scope.editable = false;
            }

            $scope.newListing = {};
            $scope.addIncome = function (newListing) {
                
                console.log(newListing);
                $scope.incomeArray.push(newListing);
                $scope.newListing = {};
                $scope.expDetails = {};
                $scope.incomeVisible = false;
            }

            // Removing Income
            $scope.removeIncome = function (index) {
                $scope.incomeArray.splice(index, 1);
            }

    }]);
