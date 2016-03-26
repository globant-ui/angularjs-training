var myApp = angular.module('myApp',[]);

/*myApp.config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider){
	
	$routeProvider.
	when('/final', {
		templateUrl : 'home.html',
		controller : 'mainController'
	})
	.when('/report', {
		templateUrl : 'report.html',
		controller : 'reportController'
	})
	
	.otherwise({
		redirectTo: '/final'
	});
	
	
}]);

*/
/*myApp.service('incomeService',function(){
	
	$scope.expense = 0;
	$scope.payment = "";
	
	$scope.payments = [];
	
	    
this.incomes = [
           ];

	
	this.expenses = [
	                ];
	
	
	
	
	
});
*/

myApp.controller('mainController', function($scope){
	$scope.income_table = false;
  $scope.expense_table = false;
  $scope.enter_income = false;
  $scope.enter_expense = false;
  $scope.total_income = 0;
  $scope.total_expense = 0;
  $scope.total_balance = 0;


	$scope.incomes = [
             ];


  $scope.expenses = [
  	                ];


	$scope.temp = new Object();
	$scope.temp = {
     	   amount : "",
     	   date : "",
     	   category : "",
     	   payment : ""
        };
        

	
	$scope.temp_2 = new Object();
	$scope.temp_2 = {
	     	   amount : "",
	     	   type : ""
	        };

	$scope.add_income = function()
	{
		if($scope.temp_2.amount != "" && $scope.temp_2.type != "")
		{
		$scope.enter_income = false;
		$scope.total_income = $scope.temp_2.amount + $scope.total_income;

		$scope.incomes.push($scope.temp_2);
		console.log($scope.incomes);
		$scope.temp_2 = new Object();
		$scope.temp_2 = {
		     	   amount : "",
		     	   type : ""
		        };
		}
		else
		{
			$scope.enter_income = true;
			return false;
		}

	};
	$scope.add_expense = function()
	{	

		if($scope.temp.amount != "" && $scope.temp.date != "" && $scope.temp.category != "" && $scope.temp.payment != "")
    		{
			$scope.enter_expense = false;
			$scope.total_expense = $scope.temp.amount + $scope.total_expense;
			$scope.total_balance = $scope.total_income - $scope.total_expense;

		$scope.expenses.push($scope.temp);
		/*$scope.temp.date = $filter('date')($scope.temp.date, "dd/MM/yyyy");
		console.log("date" + $scope.temp.date);
	*/	$scope.temp = new Object();
		$scope.temp = {
				amount : "",
				date : "",
				category : "",
				payment : ""
		};
		}
		else
    		{
    			$scope.enter_expense = true;
    			return false;
    		}

	};
	$scope.show_income = function(){
			  $scope.income_table = true;
  			$scope.expense_table = false;
  				};


  		$scope.show_expense = function(){
  			$scope.income_table = false;
      			$scope.expense_table = true;
          	};


	
		  	
	
});