'use strict'
angular.module('ExpenseManager')
  .controller('IncomeCtrl', function ($scope, ExpenseService) {
   		$scope.categories_inc  = ["Salary", "Business", "Intersts", "Other"];
		$scope.modeOfPayment  = ["Cheque", "Cash", "Credit Card", "Debit Card"];


		$scope.total = ExpenseService.total;
		//$scope.expense = [];
		$scope.income = [];
		$scope.edit = false;
		$scope.editThis = 0;
		$scope.choice = true;
		$scope.Transaction = {id : "",
						   amount : "",
							category : "",
							date : "",
							mode : "",
							note : ""
						   };
			$scope.income = ExpenseService.income;
			//$scope.expense = ExpenseService.expense;

	$scope.addExpense = function(){
			
			ExpenseService.addTransaction($scope.Transaction,true);			
			$scope.income = ExpenseService.income;
			//$scope.expense = ExpenseService.expense;
			
			ExpenseService.calculateBalance();
			$scope.total = ExpenseService.total;
			
			$scope.Transaction = {id : "" ,
						   amount : "",
							category : "",
							date : "",
							mode : "", 
							note : ""
						   };
			$scope.detailsForm.$setPristine();

		};

		$scope.EnableEdit = function(exp, index){
				$scope.edit = true;
				
				$scope.Transaction = {
        		id: exp.id,
        		amount: exp.amount,
        		category: exp.category,
        		date: exp.date,
        		mode: exp.mode,
        		note : exp.note
    		  };
    		  //$scope.Transaction = exp;
    		  $scope.editThis = index;
		};

		$scope.editExp = function(choice){
			
			ExpenseService.editTransaction($scope.editThis,true,$scope.Transaction);
			$scope.income = ExpenseService.income;
			//$scope.expense = ExpenseService.expense;


			ExpenseService.calculateBalance();
			$scope.total = ExpenseService.total;			
		
			$scope.Transaction = {id : "" ,
						   amount : "",
							category : "",
							date : "",
							mode : "", 
							note : ""
						   };
			$scope.detailsForm.$setPristine();
			$scope.edit = false;
		};

		$scope.deleteExp = function(index, choice){
  			ExpenseService.deleteTransaction(index,true);
  			$scope.income = ExpenseService.income;
			//$scope.expense = ExpenseService.expense;
  			
  			
  			ExpenseService.calculateBalance();
  			$scope.total = ExpenseService.total;
		};

		$scope.reset = function(){
			$scope.Transaction = {id : "" ,
						   amount : "",
							category : "",
							date : "",
							mode : "", 
							note : ""
						   };
			$scope.detailsForm.$setPristine();
		}
  });