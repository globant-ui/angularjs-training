'use strict';

/**
 * @ngdoc overview
 * @name mytodoApp
 * @description
 * # mytodoApp
 *
 * Main module of the application.
 */
angular
  .module('ExpenseManager', ['ngRoute', 'ui.router'])
  .config(function ($stateProvider,$urlRouterProvider,$routeProvider) {
   $urlRouterProvider.when("", "/income");
    $urlRouterProvider.when("/", "/income");
    // For any unmatched url, send to /route1
    $urlRouterProvider.otherwise("/income");
    $stateProvider
        .state('income', {
            url: '/income',
            views: {

          /*"balanceView" : { templateUrl: 'views/balance.html',
                            controller: 'ExpenseCtrl'
                          }, */
           "formView": {templateUrl: 'views/main.html',
                        controller: 'ExpenseCtrl'
                        },
            "displayView": { templateUrl: 'views/income.html',
                              controller: 'ExpenseCtrl'
                           }
           }
            /*templateUrl: 'views/main.html',
            controller: 'ExpenseCtrl'*/
        })
         
        .state('expense', {
            url: '/expense',
             views: {

              /*"balanceView" : { templateUrl: 'views/balance.html',
                            controller: 'ExpenseCtrl'
                          }, */
           "formView": {templateUrl: 'views/main.html',
                        controller: 'ExpenseCtrl'
                        },
            "displayView": { templateUrl: 'views/expense.html',
                              controller: 'ExpenseCtrl'
                           }
           }
        });



    $urlRouterProvider.otherwise('/income');

    /*$routeProvider
     //.when("", "/")
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'ExpenseCtrl'
      })
      .when('/expense', {
        templateUrl: 'views/expense.html',
        controller: 'ExpenseCtrl'
      })
      .when('/income', {
        templateUrl: 'views/income.html',
        controller: 'ExpenseCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });*/
  });
