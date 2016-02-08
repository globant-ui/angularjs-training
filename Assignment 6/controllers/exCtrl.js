	var app = angular.module("exManager", ['ngRoute']);

	app.config(['$routeProvider', function($routeProvider) {
    	$routeProvider.
    	when('/income', {
        	templateUrl: 'views/income.html'
     		//   controller: 'expensecntr'
      		}).
      	when('/expense', {
        	templateUrl: 'views/expense.html'
     		//   controller: 'expensecntr'
      		}).
      		otherwise({
        		redirectTo: '/index.html'

      		});
  	}]);


	app.controller("expensecntr",[ "$scope","$http", "expFactory", function($scope, $http,expFactory) {

	$scope.total=0;
	$scope.total_expense=0;
	$scope.total_income=0;
	$scope.sum={ };

	$scope.exvisible=false;
	$scope.clicked=false;

	$scope.newTrans={};
	$scope.startTrans=false;
	$scope.Transaction = {};
	$scope.content=null;
	$scope.searchfound;
	$scope.searchTrans="";
	$scope.searchForm=false;

	$scope.editID="";
	$scope.formsub=false;


	$scope.Transaction=expFactory.getTrans();
	console.log("From Controller : "+$scope.Transaction);

	$scope.Test=function(){
		console.log("Inside test");
		console.log($scope.Transaction);
	}

	balance= function()
	{
		$scope.sum=expFactory.balance();
		console.log("total income is : "+$scope.sum.sum_income);

	}

	$scope.addTrans = function(newTrans)
	{	
		$scope.Transaction = expFactory.addTrans(newTrans);
		console.log("Inside addTrans cntrl "+$scope.Transaction[$scope.Transaction.length-1]);
		$scope.newTrans=null;
		balance();
		startTrans=false;
		$scope.reset();
	};

	$scope.deleteTrans = function(searchId)
	{
		var confirmdel=confirm("Are Sure to Delete the Transaction "+searchId+" ? ");
		if(confirmdel) {
		$scope.Transaction = expFactory.deleteTrans(searchId);
		console.log("Transaction Deleted  ... "+searchId);
		balance();
		}
	};

	$scope.reset = function()
	{
		//$scope.newTrans={};
		$scope.trForm.$setPristine();
		$scope.trForm.$setUntouched();
		console.log("Inside Reset... reset succeful.");
	};

	$scope.editTrans = function(currentTrans)
	{
		console.log("Transaction To be Edited ... "+currentTrans.transType);

		$scope.editID=expFactory.editTrans(currentTrans);
		console.log("Search Successfull"+$scope.editID);
		$scope.searchfound=true;
		$scope.setForm();
		$scope.startTrans=true;
	};


	$scope.setForm=function(){
		var setForm=true;
		$scope.newTrans=expFactory.setForm($scope.editID);
		console.log("This is SetForm : "+setForm);
	}

}]);

/*
app.controller("pannelController", ["$scope", function($scope){
$scope.tab=1;

$scope.setTab=function(tabValue){
	$scope.tab=tabValue;
	console.log("Inside setTab ");
};

$scope.isTab=function(tabValue){
		console.log("Inside istab ");
	if($scope.tab===tabValue) return true;
	else return false;
};

}]);

*/