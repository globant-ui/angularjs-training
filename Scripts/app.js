var app = angular.module('myApp',['ngRoute']);


app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/',{
    		templateUrl: 'Views/Dashboard.html'
    	}).	
        when('/dashboard', {
        templateUrl: 'Views/Dashboard.html',
        controller: 'DashboardCtrl'
      }).
      when('/income', {
        templateUrl: 'views/IncomeShow.html',
        controller: 'IncomeCtrl'
      }).
      when('/expense', {
        templateUrl: 'views/ExpenceShow.html',
        controller: 'ExpenseCtrl'
      }).
      otherwise({
        redirectTo: '/Views/Dashboard.html'
      });
  }]);
