angular.module('expensesApp')
	.service('RecurringService', function($rootScope,updateService){
	this.recurring_array = [
	// { amount : 1000,category : "Income",  type : "Monthly", date: new Date("March 1, 2016 14:13:00")},
	// { amount : 2000,category : "Income", type : "Monthly", date: new Date("April 5, 2016 16:13:00")},
	// { amount : 1000,category : "Income", type : "Monthly", date: new Date("May 4, 2016 16:13:00")}
						 ];

	this.recur_temp = {
        category : '',
        amount : '',
        date: '',
        type : ''
    };	

    this.addRecurringTransaction = function() {
        this.recurring_array.push(this.recur_temp);
	        
		this.recur_temp = {
	        category : '',
	        amount : '',
	        date: '',
	        type : ''
	    };	

    };	
    
    this.deleteRecurringTransaction = function(index){
    		this.recurring_array.splice(index,1);
    };

});