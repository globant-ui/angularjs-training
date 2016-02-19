'use strict';

angular.module('myAppApp')
  .controller('AddCtrl', function ($scope, incomeService, expenseService, $rootElement, $location) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
    console.log("hi in main controller");
    //add form view
    var data;
   
    $scope.submit = function(){
        if ($scope.t.type == 'income') {
            data = incomeService.postData($scope.t);
            $location.path('/income');
        } else {
            data = expenseService.postData($scope.t);
            $location.path('/expense');
        }
    }
    
  });
