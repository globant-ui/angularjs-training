'use strict'
angular.module('ExpenseManager')
  .controller('ReportCtrl', function ($scope,ExpenseService) {
  	$scope.total = {sal : 0,
  					business : 0,
  					interest : 0,
  					other : 0 };
  	$scope.expTotal = {rent : 0,
  					travel : 0,
  					office : 0,
  					studies : 0 };

  	var income = ExpenseService.income; 
  	var expense = ExpenseService.expense;

  	for(var i=0 ; i<income.length ; i++)
  	{
  		var category = income[i].category;
  		if(category == 'Salary')
  			$scope.total.sal += parseInt(income[i].amount);
  		else if(category == 'Business')
  			$scope.total.business += parseInt(income[i].amount);
  		else if(category == 'Intersts')
  			$scope.total.interest += parseInt(income[i].amount);
  		else
			$scope.total.other += parseInt(income[i].amount);  			
  	}

  	for(var i=0 ; i<expense.length ; i++)
  	{
  		var category = expense[i].category;
  		if(category == 'Rent')
  			$scope.expTotal.rent += parseInt(expense[i].amount);
  		else if(category == 'Travel')
  			$scope.expTotal.travel += parseInt(expense[i].amount);
  		else if(category == 'Office')
  			$scope.expTotal.office += parseInt(expense[i].amount);
  		else
			$scope.expTotal.studies += parseInt(expense[i].amount);  			
  	}

});