'use strict';

angular.module('myAppApp')
  .controller('ReportCtrl', function ($scope, incomeService, expenseService, categoryService) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
    $scope.type = "Select Type";
    $scope.category = "";
    $scope.TransValue;
    $scope.total = 0;
    $scope.name = "earned";
    
    $scope.changeType = function(){
        $scope.categoryList = categoryService.setCategory($scope.type);
    }
    
    $scope.changeCategory = function(){
        if ($scope.type == 'income') {
            var Value = incomeService.getReportData($scope.category);
            $scope.TransValue = Value[0];
            $scope.total = Value[1];
            $scope.name = "earned";
            console.log($scope.TransValue);
        } else if($scope.type == 'expense'){
            Value = expenseService.getReportData($scope.category);
            $scope.TransValue = Value[0];
            $scope.total = Value[1];
            $scope.name = "spent"
            console.log($scope.TransValue);
        }
    }
    
  });
