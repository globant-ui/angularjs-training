
myapp.service("expenseManagerIncomeService",function(){
	this.showIncomeDetails = function(scope){
		scope.showIncome = true;
		scope.showExpense= true;
		scope.showAddIncome= false;
		scope.showAddExpense = false;		
	}
	this.addIncome = function(scope){
		scope.showAddIncome = true;
		scope.addNew = {transactionId:"",payer:"",payee:"",category:"",subcategory:"",amount:"",date:"",modeOfPayment:"",notes:"",type:""};
	}
	this.addIncomeSave = function(scope,index) {
		scope.incomeData.push(scope.addNew);
		scope.addNew = {transactionId:"",payer:"",payee:"",category:"",subcategory:"",amount:"",date:"",modeOfPayment:"",notes:"",type:""};	
		scope.showAddIncome = false;
		scope.showAddExpense = false;
	}
	this.editIncome = function(scope,index){
		scope.showAddIncome = true;
		scope.addNew = scope.incomeData[index];
		scope.addNew.indexData = true;
	}
	this.deleteIncome = function(scope,index) {
		scope.incomeData.splice(scope.incomeData[index],1);
		scope.showExpense= true;
		scope.addNew = {transactionId:"",payer:"",payee:"",category:"",subcategory:"",amount:"",date:"",modeOfPayment:"",notes:"",type:""};	
		scope.showAddIncome= true;
		scope.showAddExpense = false;
	}
});