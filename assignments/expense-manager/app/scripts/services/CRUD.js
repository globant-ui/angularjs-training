
myapp.service("CRUD",function($http,$q,$timeout){

	//the only service responsible for adding ,editing, deleting, income-expense details and showing and hiding views.
	// storing the income -expense details in variables that are available in all controllers, hence reducing the server calls.

	this.incomeData = this.expenseData = {};
	var that = this;
	this.recurringIncomeData = this.recurringExpenseData = [];

	this.incomeUrl = 'https://api.myjson.com/bins/4esbx';
	this.expenseUrl = 'https://api.myjson.com/bins/4h045';
	this.recurringIncomeUrl = 'https://api.myjson.com/bins/3wbg3';
	this.recurringExpenseUrl = 'https://api.myjson.com/bins/4o6j7';

	this.showIncomeExpenseDetails = function(scope){
		scope.showTransaction = true;
		scope.showAddTransaction= false;
	}
	this.addTransaction = function(scope){
		scope.showAddTransaction = true;
		scope.showTransaction = false;
		scope.addNew = {transactionId:"",payer:"",payee:"",category:"",subcategory:"",amount:"",date:"",modeOfPayment:"",notes:"",transType:""};	
	}

	this.addTransactionSave = function(scope) {	
		scope.transactionData.push(scope.addNew);	
		
		$http({
			method: 'PUT',
			url: scope.data_source,
			data: angular.toJson(scope.transactionData)
		})
		.then(function(response){
			console.log("done");
		});
	}

	this.editTransaction = function(scope,index){
		scope.showAddTransaction = true;
		scope.showTransaction = false;
		scope.addNew = scope.transactionData[index];
		scope.addNew.amount = parseInt(scope.transactionData[index].amount);
		scope.addNew.indexData = true;
	}
	this.deleteTransaction = function(scope,index) {
		scope.transactionData.splice(index,1);
		$http({
			method: 'PUT',
			url: scope.data_source,
			data: angular.toJson(scope.transactionData)
		})
		.then(function(response){
			console.log("done");
		});
		scope.addNew = {transactionId:"",payer:"",payee:"",category:"",subcategory:"",amount:"",date:"",modeOfPayment:"",notes:"",transType:""};	
	}

	this.updateTransaction = function(scope) {

		$http({
			method: 'PUT',
			url: scope.data_source,
			data: angular.toJson(scope.transactionData)
		})
		.then(function(response){
			console.log("done");
		});
		
	}

	this.getIncomeExpenseData = function(scope){
		
		return $http({
					method: 'GET',
					url: scope.data_source
				})
				.then(function(response){
					if(typeof response.data === 'object' ) {
						return response.data;
					} else
					{
						$q.reject(response.data);
					}		
				},function errorCallback(response) {
					$q.reject(response.data);
				});	
	}

	this.storeIncomeData = function(scope){
		this.incomeData = scope.tempData;
	}

	this.storeExpenseData = function(scope){
		this.expenseData = scope.tempData;
	}
	
	this.getIncomeData = function(){
		return this.incomeData;
	}

	this.getExpenseData = function(){
		return this.expenseData;
	}


	var storeRecurringIncomeData = function(scope){
		this.recurringIncomeData = scope.recurringData;
	}

	var getRecurringIncomeData = function(){
		return this.recurringIncomeData;
	}

	var storeRecurringExpenseData = function(scope){
		this.recurringExpenseData = scope.recurringData;
	}

	var getRecurringExpenseData = function(){
		return this.recurringExpenseData;
	}
	
	var calculateTotal = function(arrObj,transType) {
		var sum=0;
		arrObj = arrObj.filter(function( obj ) {
					sum = sum + obj.amount;
				 // return sum;
				});	
		console.log(sum);
		if(transType == 'income'){
			this.totalIncome = sum;
		} else {
			this.totalExpense = sum;
		}
		return sum;
	}

	this.getTotalDetails = function(scope) {
		//getting income data from service
		scope.data_source = this.incomeUrl;
		this.getIncomeExpenseData(scope)
		.then(function(data){
			var processData = data;
			this.incomeData = processData;
			that.incomeData = processData;
			if(processData.length>0){
				scope.totalIncome = calculateTotal(processData,'income');
			}
		});

		//getting expense data from service
		scope.data_source = this.expenseUrl;
		this.getIncomeExpenseData(scope)
		.then(function(data){
			var processData = data;
			this.expenseData = processData;
			that.expenseData = processData;
			if(processData.length>0){
				scope.totalExpense = calculateTotal(processData,'expense');
			} 
			scope.balance = scope.totalIncome - scope.totalExpense;
		});
	}

	this.showRecurringData = function(transactionType,scope) {
		// getting recurring income information 
		this.getIncomeExpenseData(scope)
		.then(function(data){
			if(typeof data === 'object') {
				var today = new Date();
			    var mm = today.getMonth()+1; //January is 0!
			    if(mm<10){
			        mm='0'+mm
			    } 
			    
				scope.recurringData = data.filter(function( obj ) {
					var recurDate = obj.date;
					recurDate = recurDate.substring(3, 5);
				  return recurDate == mm || obj.recurringType == 'Yearly';
				});	
				if(transactionType == 'income') {
					that.recurringIncomeData = scope.recurringData;
				} else {
					that.recurringExpenseData = scope.recurringData;
				}
				
				scope.showDirective = true;
			} 
			scope.showIncomeExpenseDetails();
		});
	}

	this.getTransactionData = function(transactionType,scope) {
		scope.tempData = {};
		
		if(transactionType == 'income') {
			scope.incomeData = this.incomeData;
			scope.transactionData = scope.incomeData;
			scope.showPayer = true;
			scope.recurringData = this.recurringIncomeData;
			scope.data_source = this.recurringIncomeUrl;
				
		} else if(transactionType == 'expense') {
			scope.expenseData = this.getExpenseData();
			scope.transactionData =  scope.expenseData;
			scope.showPayee = true;
			scope.recurringData = this.recurringExpenseData;
			scope.data_source = this.recurringExpenseUrl;
		}
		
		
		if(scope.recurringData == undefined || scope.recurringData.length == 0) {
			this.showRecurringData(transactionType,scope);
		} else {	
			scope.showDirective= true;	
			this.showIncomeExpenseDetails(scope);
		}
		
	}

	this.validate = function(scope) {
		
		if(scope.transactionForm.$valid){
			return false;
		} else if(scope.transactionForm.$invalid){
			return true;
		}
		return false;
	}

});