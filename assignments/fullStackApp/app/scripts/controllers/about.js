'use strict';

/**
 * @ngdoc function
 * @name iemApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the iemApp
 */
angular.module('iemApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
