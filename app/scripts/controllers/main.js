'use strict';

/**
 * @ngdoc function
 * @name myAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the myAppApp
 */
angular.module('myAppApp')
  .controller('MainCtrl', function ($scope, dataService, $window) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
    console.log("hi in main controller");
    //add form view

    $scope.t = {};
    
    $scope.submit = function(){
        var url = "http://localhost:9000/#/view"
        dataService.postData($scope.t, $scope.t.type);
        dataService.update();
        $window.location.href = url;
    }
    
  });
