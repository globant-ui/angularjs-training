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
   $urlRouterProvider.when("", "/home");
    $urlRouterProvider.when("/", "/home");
    $urlRouterProvider.otherwise("/home");
    $stateProvider
        .state('income', {
            url: '/income',
            views: {

          "balanceView" : { templateUrl: 'views/balance.html',
                            controller: 'showBalanceCtrl'
                          }, 
           "formView": {templateUrl: 'views/incomeForm.html',
                        controller: 'IncomeCtrl'
                        },
            "displayView": { templateUrl: 'views/income.html',
                              controller: 'showIncomeCtrl'
                           }
           }
            
        })
         
        .state('expense', {
            url: '/expense',
             views: {

              "balanceView" : { templateUrl: 'views/balance.html',
                                controller: 'showBalanceCtrl'
                              }, 
              "formView": { templateUrl: 'views/expenseForm.html',
                           controller: 'ExpenseCtrl'
                          },
            "displayView": { templateUrl: 'views/expense.html',
                              controller: 'showExpenseCtrl'
                           }
           }
        });



    $urlRouterProvider.otherwise('/income');

})

.config(function ($provide) {
  $provide.provider("Balance", function () {
    return {
      $get: function () {
        return {
          total: {
                  income : 0,
                  expense : 0,
                  balance : 0 
                 }
        };
      }
    };
  });
})