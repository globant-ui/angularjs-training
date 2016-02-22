'use strict';

/**
 * @ngdoc overview
 * @name iemApp
 * @description
 * # iemApp
 *
 * Main module of the application.
 */
angular
  .module('myApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
  ])
  .config(function ($routeProvider) {
    $routeProvider.
    when('/expenseDetails', {
        templateUrl: 'views/expenseDetails.html',
        controller: 'ExpenseDetailsCtrl'
    }).
    when('/incomeDetails', {
        templateUrl: 'views/incomeDetails.html',
        controller: 'IncomeDetailsCtrl'
    }).
    when('/addDetails', {
        templateUrl: 'views/addDetails.html',
        controller: 'MainCtrl'
    }).
    otherwise({
        redirectTo: '/addDetails'
    });
});
