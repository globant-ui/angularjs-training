/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var myApp = angular.module("expenseManagementApp", ["ngRoute"]);

myApp.config(['$routeProvider', function($routeProvider) {
        $routeProvider.
        when('/addtransaction', {
            templateUrl: 'views/addTransaction.html',
            controller: 'addTransactionController'        
        }).when('/viewexpensetable', {
            templateUrl: 'views/expenseTable.html',
            controller: 'mainController'
        }).when('/viewincometable', {
            templateUrl: 'views/incomeTable.html',
            controller: 'mainController'
        }).when('/edittransaction', {
            templateUrl: 'views/addTransaction.html',
            controller: 'editTransactionController'
        }).when('/reports', {
            templateUrl: 'views/reports.html',
            controller: 'reportsController'
        }).otherwise({
            redirectTo: "/"
        });
    }]);