
var app = angular.module("expensesApp", []);

app.controller("controller", function($scope) {
    // $scope.income_array = [10,15,20,30];
    // $scope.exp_array = [5,10,15,20];
    $scope.income_array = [
    	{
    		"name" : "Business",
    		"value": 30
    	},
    	{
    		"name" : "Interest",
    		"value": 50
    	},
    	{
    		"name" : "Others",
    		"value": 100
    	}

    ];

    $scope.total_income = function(){
         var total_in = 0;  
        for ( var i = 0, _len = $scope.income_array.length; i < _len; i++ ) {
            total_in += $scope.income_array[i].value;
        }
    return total_in;
}

    $scope.exp_array = [
    	{
    		"name" : "Rent",
    		"value": 20
    	},
    	{
    		"name" : "Travel",
    		"value": 30
    	},
    	{
    		"name" : "Party",
    		"value": 20
    	},
    	{
    		"name" : "Shopping",
    		"value": 50
    	},

    ];

     $scope.total_exp = function(){
         var total_ex = 0;  
        for ( var i = 0, _len = $scope.exp_array.length; i < _len; i++ ) {
            total_ex += $scope.exp_array[i].value;
        }
    return total_ex;
};

     $scope.total_bal = function(){
         var total_balance = $scope.total_income() - $scope.total_exp();
    return total_balance;
};

    
});