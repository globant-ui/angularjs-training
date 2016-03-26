var myApp = angular.module('myApp',['ngMessages']);

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
$scope.submitted = false;
	$scope.edit_income = "";
	$scope.edit_expense = "";
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
	$scope.calculate_balance = function()
	{
	}

	$scope.add_income = function()
	{
		if($scope.temp_2.amount != "" && $scope.temp_2.type != "")
		{
		$scope.enter_income = false;
		$scope.total_income = $scope.temp_2.amount + $scope.total_income;
		$scope.total_balance = $scope.total_income - $scope.total_expense;
		if($scope.edit_income === "")
		{
		$scope.incomes.push($scope.temp_2);

		}
		else
		{

			$scope.total_income = $scope.total_income - $scope.incomes[$scope.edit_income].amount;

			$scope.total_balance = $scope.total_income - $scope.total_expense;
			$scope.incomes[$scope.edit_income] = $scope.temp_2;

		}
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

  		$scope.edit_income="";

	};
	$scope.add_expense = function()
	{	

		if($scope.temp.amount != "" && $scope.temp.date != "" && $scope.temp.category != "" && $scope.temp.payment != "")
    		{
			$scope.enter_expense = false;
			$scope.total_expense = $scope.temp.amount + $scope.total_expense;
			$scope.total_balance = $scope.total_income - $scope.total_expense;
			if($scope.edit_expense === "")
			{
		$scope.expenses.push($scope.temp);

				}
				else
				{
						$scope.total_expense = $scope.total_expense - $scope.expenses[$scope.edit_expense].amount;

        			$scope.total_balance = $scope.total_income - $scope.total_expense;

		$scope.expenses[$scope.edit_expense]=$scope.temp;

						}
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

 			$scope.edit_expense = "";

	};
	$scope.show_income = function(){
			  $scope.income_table = true;
  			$scope.expense_table = false;
  				};


  		$scope.show_expense = function(){
  			$scope.income_table = false;
      			$scope.expense_table = true;
          	};


	$scope.edit_income_form = function (index){

		$scope.edit_income = index;
		$scope.temp_2.amount = $scope.incomes[index].amount;
		$scope.temp_2.type = $scope.incomes[index].type;
	};

	$scope.edit_expense_form = function (index){

    		$scope.edit_expense = index;
    		$scope.temp.amount = $scope.expenses[index].amount;
    		$scope.temp.category = $scope.expenses[index].category;
    			$scope.temp.date = $scope.expenses[index].date;
    				$scope.temp.payment = $scope.expenses[index].payment;
    	};


	$scope.delete_income_form = function(index){
		$scope.total_income = $scope.total_income - $scope.incomes[index].amount;

			$scope.incomes.splice(index,1);

    			$scope.total_balance = $scope.total_income - $scope.total_expense;

	};

	$scope.delete_expense_form = function(index){
  		$scope.total_expense = $scope.total_expense - $scope.expenses[index].amount;

  			$scope.expenses.splice(index,1);

      			$scope.total_balance = $scope.total_income - $scope.total_expense;

  	};
});