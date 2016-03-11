'use strict';
var myapp = angular.module("expenseManagerApp",['ngRoute','ngDialog']).
	config(function($routeProvider,ngDialogProvider,$locationProvider) {

	//setting classname for the alert dialog used for validation
	ngDialogProvider.setDefaults({
 	   className: 'ngdialog-theme-default',
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
});