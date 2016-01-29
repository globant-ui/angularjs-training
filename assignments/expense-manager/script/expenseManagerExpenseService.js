
myapp.service("expenseManagerExpenseService",function(){
	this.showExpenseDetails = function(scope){
		scope.showIncome= false;
		scope.showExpense= false;
		scope.showAddIncome = false;
		scope.showAddExpense = false;
	}
	this.addExpense = function(scope){
		scope.showAddExpense = true;
		scope.addNewExpense = {transactionId:"",payer:"",payee:"",category:"",subcategory:"",amount:"",date:"",modeOfPayment:"",notes:"",type:""};
	}
	this.addExpenseSave = function(scope) {
		scope.expenseData.push(scope.addNewExpense);
		scope.addNewExpense = {transactionId:"",payer:"",payee:"",category:"",subcategory:"",amount:"",date:"",modeOfPayment:"",notes:"",type:""};
		scope.showAddIncome = false;
		scope.showAddExpense = false;
	}
	this.editExpense = function(scope,index){
		scope.showAddExpense = true;
		scope.addNewExpense = scope.expenseData[index];
		scope.addNewExpense.indexData = true;
	}
	this.deleteExpense = function(scope,index) {
		scope.expenseData.splice(scope.expenseData[index],1);
		scope.showIncome= false;
		scope.showAddIncome= false;
		scope.addNewExpense = {transactionId:"",payer:"",payee:"",category:"",subcategory:"",amount:"",date:"",modeOfPayment:"",notes:"",type:""};
		scope.showAddExpense = true;
	}	
});
