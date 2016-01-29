(function(){
var ExpenseManager = angular.module('ExpenseManager',[]);

	ExpenseManager.controller('ExpenseCtrl', function($scope, ExpenseService){

		$scope.categories_exp  = ["Rent", "Travel", "Office", "Studies"];		
		$scope.categories_inc  = ["Salary", "Business", "Intersts", "Other"];
		$scope.modeOfPayment  = ["Cheque", "Cash", "Credit Card", "Debit Card"];


		$scope.total = {income : 0, expense : 0, balance : 0};
		$scope.expense = [];
		$scope.income = [];
		$scope.edit = false;
		$scope.editThis = 0;

		$scope.Transaction = {id : "",
						   amount : "",
							category : "",
							date : "",
							mode : "",
							note : ""
						   };
			$scope.income = ExpenseService.income;
			$scope.expense = ExpenseService.expense;

	$scope.addExpense = function(choice){
			
			ExpenseService.addTransaction($scope.Transaction,choice);			
			$scope.income = ExpenseService.income;
			$scope.expense = ExpenseService.expense;
			
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
    		  $scope.editThis = index;
		};

		$scope.editExp = function(choice){
			
			ExpenseService.editTransaction($scope.editThis,choice,$scope.Transaction);
			$scope.income = ExpenseService.income;
			$scope.expense = ExpenseService.expense;


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
  			ExpenseService.deleteTransaction(index,choice);
  			$scope.income = ExpenseService.income;
			$scope.expense = ExpenseService.expense;
  			
  			
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
})

ExpenseManager.service('ExpenseService', function(){
  	
  		this.income = [];
  		this.expense = [];
  		this.total = {income : 0, expense : 0, balance : 0};

		this.addTransaction = function(TransactionObj, choice){
			if(choice)
				this.income.push(TransactionObj);
			else
				this.expense.push(TransactionObj);
		},
		
		this.deleteTransaction = function(index, choice){
			if(choice)
				this.income.splice(index,1);
			else
				this.expense.splice(index,1);
		}

		this.editTransaction = function(index, choice, TransactionObj)
		{
			if(choice)
			{
				this.income.splice(index,1);
				this.income.splice(index, 0, TransactionObj);
			}
			else
			{
				this.expense.splice(index,1);
				this.expense.splice(index, 0, TransactionObj);
			}
		}

		this.calculateBalance = function()
		{

			this.total = {income : 0, expense : 0, balance : 0};

			for(var i = 0 ; i < this.income.length; i++)
			this.total.income += parseInt(this.income[i].amount,10); 

			for(var i = 0 ; i < this.expense.length; i++)
			this.total.expense += parseInt(this.expense[i].amount, 10); 

			this.total.balance = this.total.income - this.total.expense;			
		}
	});
})();

