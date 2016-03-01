'use strict';

/**
 * @ngdoc overview
 * @name myAppApp
 * @description
 * # myAppApp
 *
 * Main module of the application.
 */
angular
  .module('myAppApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/entry.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/dashboard', {
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardCtrl',
        controllerAs: 'dashboard'
      })
      .when('/add', {
        templateUrl: 'views/addTrans.html',
        controller: 'AddCtrl',
        controllerAs: 'add'
      })
      .when('/reports', {
        templateUrl: 'views/reports.html',
        controller: 'ReportCtrl',
        controllerAs: 'report'
      })
      .when('/:type', {
        templateUrl: 'views/table.html',
        controller: 'TableCtrl',
        controllerAs: 'table'
      })
      .when('/:type/:id/edit', {
        templateUrl: 'views/addTrans.html',
        controller: 'EditCtrl',
        controllerAs: 'table'
      })
      .when('/:type/:id/delete', {
        templateUrl: 'views/table.html',
        controller: 'DltCtrl',
        controllerAs: 'table'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
