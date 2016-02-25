'use strict'
angular.module('ExpenseManager')
	.service('RecurringService', function($rootScope,ExpenseService,$state){
		this.recurringTransactions = [{ amount : 1000,category : "Income",  type : "Monthly", date: new Date("March 1, 2016 14:13:00")},
						  { amount : 2000,category : "Income", type : "Monthly", date: new Date("April 5, 2016 16:13:00")},
						  { amount : 1000,category : "Income", type : "Monthly", date: new Date("May 4, 2016 16:13:00")}
						 ];

		this.sortByReccuringDate = function(a, b) {
                 return new Date(a.date).getTime() - new Date(b.date).getTime();
        },

        //function to show top most overcoming recurring notifications
		this.filterRecurringTransactions = function(){
			this.recurringTransactionsForNotif = [];
			var todayDate = new Date();
			var self = this;

			for(var i =0; i<this.recurringTransactions.length ; i++){
				if(self.recurringTransactions[i].date >= todayDate)
					self.recurringTransactionsForNotif.push(self.recurringTransactions[i]);
			}
			this.recurringTransactionsForNotif.sort(this.sortByReccuringDate);
			return this.recurringTransactionsForNotif;
		},
		
		//Function to add new recurring transaction
		this.setRecurringTransaction = function(Recurring){
			this.recurringTransactions.push(Recurring);
			console.log(this.recurringTransactions);
			$rootScope.$broadcast('recurring transaction change');
		},

		this.addRecurringTransaction = function(index) {
			var category = this.recurringTransactionsForNotif[index].category;

			//A transaction type object to add into either 'Income' or 'Expense'
			var toBeAddedTransaction ={};
			toBeAddedTransaction.amount =this.recurringTransactionsForNotif[index].amount;
			toBeAddedTransaction.date =this.recurringTransactionsForNotif[index].date;
			toBeAddedTransaction.note =this.recurringTransactionsForNotif[index].note;
			toBeAddedTransaction.category = this.recurringTransactionsForNotif[index].type;
			toBeAddedTransaction.mode = "Account Transfer";
			
			if(category == "Income")
				ExpenseService.addTransaction(toBeAddedTransaction, true);
			else
				ExpenseService.addTransaction(toBeAddedTransaction, false);

			//after adding delete from notifications
			this.deleteRecurringTransaction(index);

			alert('Recurring Transaction Done.')
			
		},

		this.deleteRecurringTransaction = function(index) {
			var notifToDelete = this.recurringTransactionsForNotif[index];
			for(var i=0; i<this.recurringTransactions.length;i++)
			{
				if(this.recurringTransactions[i] === notifToDelete)
				{
					console.log('found');
					this.recurringTransactions.splice(i,1);
					console.log(this.recurringTransactions);
					break;
				}

			}

			//this.recurringTransactionsForNotif.splice(index,1);
		}

});
  	
