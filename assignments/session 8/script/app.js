(function(){
	var myApp,
		name = "expenceManager",
		requires = ["ngRoute"];
	myApp = angular.module(name, requires);
		
	myApp.config(function($routeProvider){
		$routeProvider
			.when("/addIncome", {
				templateUrl: "partials/addIncome.html"
			})
			.when("/addExpense",{
				templateUrl: "partials/addExpense.html"
			})
			.when("/showIncome",{
				templateUrl:"partials/showIncome.html"
			})
			.when("/showExpense",{
				templateUrl:"partials/showExpense.html"
			})
			.when("/settings",{
				templateUrl:"partials/settings.html"
			})
			.otherwise({
				redirectTo:"/"
			})
	});
}());