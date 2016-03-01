'use strict';

/**
 * @ngdoc overview
 * @name gpatilApp
 * @description
 * # gpatilApp
 *
 * Main module of the application.
 */
angular
  .module('expensesApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
.config(function ($routeProvider) {
    $routeProvider.
    when('/home', {
        templateUrl: 'views/main.html',
        controller: 'controller'
    }).
    when('/income', {
        templateUrl: 'views/income.html',
        controller: 'incomeController'
    }).
    when('/expense', {
        templateUrl: 'views/expense.html',
        controller: 'expenseController'
    }).
    otherwise({
        redirectTo: '/home'
    });
  });
