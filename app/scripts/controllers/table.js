'use strict';

/**
 * @ngdoc function
 * @name myAppApp.controller:IncomeCtrl
 * @description
 * # TableCtrl
 * Controller of the myAppApp
 */
angular.module('myAppApp')
  .controller('TableCtrl', ['$scope', 'dataService' , function ($scope, dataService) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
    // console.log("Hi in income controller");
    $scope.IncomeArray = [];
    $scope.ExpenseArray = [];
    // $scope.type = $rootParams.type;
    // console.log($scope.type);
    var incomeURL = "https://demo4989304.mockable.io/incomeTransactions";
    var expenseURL = "https://demo4989304.mockable.io/incomeTransactions";
    var type = 'income';
    
    $scope.getIncomeData = function(){
        dataService.getData(incomeURL,'income')
            .then(function(data){
               if(data != null){
                   $scope.TransValue = data;
                   $scope.IncomeArray = data;
                //    console.log($scope.TransValue);
               } else {
                   console.log("Data is not as expected");
               }
            }, function(){
                console.log("Error in promise");
            });
    }
    
    $scope.modify = function(){
        // console.log("in modify");
    }
    
    $scope.del = function(){
        console.log("delete");
    }
    
    $scope.update = function(){
        
    }
        
    $scope.getIncomeData();
    
  }]);
  