'use strict';

/**
 * @ngdoc function
 * @name myAppApp.controller:IncomeCtrl
 * @description
 * # TableCtrl
 * Controller of the myAppApp
 */
angular.module('myAppApp')
  .controller('TableCtrl', ['$scope', 'dataService', '$route', '$routeParams', function ($scope, dataService, $route, $routeParams) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
    console.log("Hi in income controller");
    $scope.IncomeArray = [];
    $scope.ExpenseArray = [];
    $scope.type = $routeParams.type;
    var URLPath;
    
    if ($scope.type == 'income') {
        URLPath = "https://demo4989304.mockable.io/incomeTransactions";
    } else {
        URLPath = "https://demo4989304.mockable.io/expenseTransactions";
    }

    $scope.getIncomeData = function(){
        dataService.getData(URLPath, $scope.type)
            .then(function(data){
               if(data != null){
                   $scope.TransValue = data;
                //    $scope.IncomeArray = data;
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
  