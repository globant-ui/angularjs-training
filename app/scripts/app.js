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
      .when('/add', {
        templateUrl: 'views/addTrans.html',
        controller: 'AddCtrl',
        controllerAs: 'add'
      })
      .when('/view/:type', {
        templateUrl: 'views/table.html',
        controller: 'TableCtrl',
        controllerAs: 'table'
      })
      .when('/view/:type/:id/edit', {
        templateUrl: 'views/table.html',
        controller: 'EditCtrl',
        controllerAs: 'table'
      })
      .when('/view/:type/:id/delete', {
        templateUrl: 'views/table.html',
        controller: 'DltCtrl',
        controllerAs: 'table'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
