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
myApp.service('incomeService',function(){
 this.total_income = 0;
  this.total_expense = 0;
  this.total_balance = 0;
  this.edit_income = "";
  this.edit_expense = "";

			this.income_table = false;
      this.expense_table = false;
      this.enter_income = false;
      this.enter_expense = false;
			this.edit_income = "";
		this.incomes = [
               ];


    this.expenses = [
    	                ];


  	this.temp = new Object();
  	this.temp = {
       	   amount : "",
       	   date : "",
       	   category : "",
       	   payment : "",
       	   notes : ""
          };



  	this.temp_2 = new Object();
  	this.temp_2 = {
  	     	   amount : "",
  	     	   type : ""
  	        };




	this.add_income = function()
  	{
  		if(this.temp_2.amount != "" && this.temp_2.type != "")
  		{
  		this.enter_income = false;
  		this.total_income = this.temp_2.amount + this.total_income;
  		this.total_balance = this.total_income - this.total_expense;
  		if(this.edit_income === "")
  		{
  		this.incomes.push(this.temp_2);

  		}
  		else
  		{

  			this.total_income = this.total_income - this.incomes[this.edit_income].amount;

  			this.total_balance = this.total_income - this.total_expense;
  			this.incomes[this.edit_income] = this.temp_2;

  		}
  		this.temp_2 = new Object();
  		this.temp_2 = {
  		     	   amount : "",
  		     	   type : ""
  		        };
  		}
  		else
  		{
  			this.enter_income = true;
  			return false;
  		}

    		this.edit_income="";

  	};

  	this.add_expense = function(){

  	if(this.temp.amount != "" && this.temp.date != "" && this.temp.category != "" && this.temp.payment != "")
        		{
    			this.enter_expense = false;
    			this.total_expense = this.temp.amount + this.total_expense;
    			this.total_balance = this.total_income - this.total_expense;
    			if(this.edit_expense === "")
    			{
    		this.expenses.push(this.temp);

    				}
    				else
    				{
    						this.total_expense = this.total_expense - this.expenses[this.edit_expense].amount;

            			this.total_balance = this.total_income - this.total_expense;

    		this.expenses[this.edit_expense]=this.temp;

    						}
    		/*$scope.temp.date = $filter('date')($scope.temp.date, "dd/MM/yyyy");
    		console.log("date" + $scope.temp.date);
    	*/	this.temp = new Object();
    		this.temp = {
    				amount : "",
    				date : "",
    				category : "",
    				payment : "",
            notes : ""
    		};
    		}
    		else
        		{
        			this.enter_expense = true;
        			return false;
        		}

     			this.edit_expense = "";

  	};

	
});


myApp.controller('mainController', function($scope,incomeService){
	$scope.edit_income = "";
	$scope.edit_expense = "";
	$scope.income_table = incomeService.income_table;
  $scope.expense_table = incomeService.expense_table;
  $scope.enter_income = incomeService.enter_income;
  $scope.enter_expense = incomeService.enter_expense;

	$scope.temp_2 = new Object();
  	$scope.temp_2 = {
  	     	   amount : "",
  	     	   type : ""
  	        };
	$scope.temp = new Object();
  	$scope.temp = {
       	   amount : "",
       	   date : "",
       	   category : "",
       	   payment : "",
           notes : ""
          };




	$scope.incomes = incomeService.incomes;


  $scope.expenses = incomeService.expenses;

	$scope.temp = incomeService.temp;
/*
	$scope.temp = {
     	   amount : "",
     	   date : "",
     	   category : "",
     	   payment : ""
        };
        
*/

	$scope.add_income = function()
	{
	incomeService.temp_2 = $scope.temp_2;
	incomeService.add_income();
		$scope.temp_2 = {
    	     	   amount : "",
    	     	   type : ""
    	        };
    	 $scope.total_income = incomeService.total_income;
       $scope.total_expense = incomeService.total_expense;
       $scope.total_balance = incomeService.total_balance;


	};


	$scope.add_expense = function()
	{	
		incomeService.temp = $scope.temp;
		incomeService.add_expense();
		$scope.temp = {
    	     	   amount : "",
    	     	   date : "",
    	     	   category : "",
    	     	   payment : "",
               notes : ""
    	        };
	 $scope.total_income = incomeService.total_income;
    $scope.total_expense = incomeService.total_expense;
    $scope.total_balance = incomeService.total_balance;


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
		incomeService.edit_income = index;
		$scope.temp_2.amount = incomeService.incomes[index].amount;
		$scope.temp_2.type = incomeService.incomes[index].type;
	};

	$scope.edit_expense_form = function (index){

    		$scope.edit_expense = index;
    		incomeService.edit_expense = index;
    		$scope.temp.amount = incomeService.expenses[index].amount;
    		$scope.temp.category = incomeService.expenses[index].category;
    			$scope.temp.date = incomeService.expenses[index].date;
    				$scope.temp.payment = incomeService.expenses[index].payment;
    				$scope.temp.notes = incomeService.expenses[index].notes;
    	};


	$scope.delete_income_form = function(index){
		$scope.total_income = $scope.total_income - $scope.incomes[index].amount;
	incomeService.total_income = $scope.total_income;
			$scope.incomes.splice(index,1);
		incomeService.incomes = $scope.incomes;
    			$scope.total_balance = $scope.total_income - $scope.total_expense;
    			incomeService.total_balance = $scope.total_balance;

	};

	$scope.delete_expense_form = function(index){
  		$scope.total_expense = $scope.total_expense - $scope.expenses[index].amount;
			incomeService.total_expense = $scope.total_expense;
  			$scope.expenses.splice(index,1);
				incomeService.expenses = $scope.expenses;
      			$scope.total_balance = $scope.total_income - $scope.total_expense;
				incomeService.total_balance = $scope.total_balance;
  	};
});