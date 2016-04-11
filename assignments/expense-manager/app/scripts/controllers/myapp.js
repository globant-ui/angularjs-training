'use strict';

angular.module("expenseManagerApp",['ngRoute','ngDialog','angularSpinner','toaster','720kb.datepicker'])
.constant("MODE_OF_PAYMENT", ["Cash","Electronic Transfer","Cheque","Credit Card"] )
.constant("CATEGORY", ["Salary","Loan Installment","Shopping","Medicines","Freelancing","Saving","Bill"] )
.constant("SUB_CATEGORY", ["Full Time","Edu Loan","Electronic","Emergency","Part Time","Policies"] )
.constant("SELECTED_RECURRING_TYPE", {name: "Monthly"} )
.config(function($routeProvider,$httpProvider,ngDialogProvider,$locationProvider,usSpinnerConfigProvider) {

	
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
		templateUrl: "./views/manipulateIncomeExpenseDetails.html",
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

/*angular.module("expenseManagerApp").constant('MODE_OF_PAYMENT', ["Cash","Electronic Transfer","Cheque","Credit Card"] );
angular.module("expenseManagerApp").constant('CATEGORY', ["Salary","Loan Installment","Shopping","Medicines","Freelancing","Saving","Bill"] );
angular.module("expenseManagerApp").constant('SUBCATEGORY', ["Full Time","Edu Loan","Electronic","Emergency","Part Time","Policies"] );
angular.module("expenseManagerApp").constant('SELECTED_RECURRING_TYPE', {name: "Monthly"} );
*/