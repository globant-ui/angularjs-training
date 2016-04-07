'use strict';

angular.module("expenseManagerApp",['ngRoute','ngDialog','angularSpinner','toaster','720kb.datepicker'])

.config(function($routeProvider,$httpProvider,ngDialogProvider,$locationProvider,usSpinnerConfigProvider) {

	$httpProvider.defaults.headers = { 'Access-Control-Allow-Origin' : '*' };

	usSpinnerConfigProvider.setTheme('bigBlue', {radius:30, width:8, length: 16, color: 'blue'});
	//setting classname for the alert dialog used for validation
	ngDialogProvider.setDefaults({
	   className: 'ngdialog-theme-default'
	});    

    //route to show/add/edit-delete/show income - expense details 
	$routeProvider
	.when("/showIncomeExpenseDetails/:transactionType", {
		templateUrl: "./views/showIncomeExpenseDetails.html",
		controller: "showIncomeExpenseController"
	})
	.when("/addIncomeExpenseDetails/:transactionType", {
		templateUrl: "./views/addIncomeExpenseDetails.html",
		controller: "addIncomeExpenseController"
	})
	.when("/manipulateIncomeExpenseDetails/:transactionType/:action/:index", {
		templateUrl: "./views/addIncomeExpenseDetails.html",
		controller: "manipulateIncomeExpenseController"
	})
	.when("/showReportsDetails", {
		templateUrl: "./views/showReportDetails.html",
		controller: "showReportController"
	});
})
.run(function($rootScope,$route,$location) {
 	// instance-injector

 	$rootScope.routes = $location.$$path;
	$route.reload();
	
});