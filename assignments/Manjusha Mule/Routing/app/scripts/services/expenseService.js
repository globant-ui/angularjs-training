'use strict'
angular.module('ExpenseManager')
	.service('ExpenseService', function(){
  	
  		this.income = [];
  		/*$http.get("https://demo1468896.mockable.io/income").
  		then(function(response){this.income = response.data;},
  			function(errResponse){console.error('Error');
  		});
*/
  		/*$http.get('/api/note').then(function(response) {
self.items = response.data;
}, function(errResponse) {
console.error('Error while fetching notes');
});*/
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

