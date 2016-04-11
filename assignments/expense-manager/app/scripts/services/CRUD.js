
angular.module("expenseManagerApp").service("CRUD",function($http,$q,$timeout,usSpinnerService,toaster){

	//the only service responsible for adding ,editing, deleting, income-expense details and showing and hiding views.
	// storing the income -expense details in variables that are available in all controllers, hence reducing the server calls.
	this.incomeData 			= this.expenseData = {};
	this.lastFiveTransactions 	= [];
	
	var that 					= this;

	this.recurringIncomeData 	= this.recurringExpenseData = [];

	this.incomeUrl 				= 'https://api.myjson.com/bins/58x0u';
	this.expenseUrl 			= 'https://api.myjson.com/bins/48vc6';
	this.recurringIncomeUrl 	= 'https://api.myjson.com/bins/3wbg3';
	this.recurringExpenseUrl 	= 'https://api.myjson.com/bins/4o6j7';
	this.lastFiveUrl			= 'https://api.myjson.com/bins/1d354';


	this.showIncomeExpenseDetails = function(scope){
		scope.showTransaction = true;
		scope.showAddTransaction= false;
	}
	this.addTransaction = function(scope){
		scope.showAddTransaction = true;
		scope.showTransaction = false;
		scope.addNew = {transactionId:"",payer:"",payee:"",category:"",subcategory:"",amount:"",date:"",modeOfPayment:"",notes:"",transType:""};	
	}

	var saveLastFiveTransactions = function(lastFiveUrl,lastFiveTransactions) {
		console.log(lastFiveTransactions);
		$http({
			method: 'PUT',
			url: lastFiveUrl,
			data: angular.toJson(lastFiveTransactions)
		})
		.then(function(response){		
			console.log("done");
		});
	}

	this.addTransactionSave = function(scope) {	
		var lastFiveUrl			 = this.lastFiveUrl;
		var lastFiveTransactions = this.lastFiveTransactions;
		scope.transactionData.push(scope.addNew);	
		toaster.pop({type: 'wait', title: "Adding Record", body:""});
		
		$http({
			method: 'PUT',
			url: scope.data_source,
			data: angular.toJson(scope.transactionData)
		})
		.then(function(response){
			saveLastFiveTransactions(lastFiveUrl,lastFiveTransactions);			
			return true;
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
			method: 'DELETE',
			url: scope.data_source,
			data: angular.toJson(scope.transactionData)
		})
		.then(function(response){
			console.log("done");
			scope.addNew = {transactionId:"",payer:"",payee:"",category:"",subcategory:"",amount:"",date:"",modeOfPayment:"",notes:"",transType:""};	
			return true;
		});
		
	}

	this.updateTransaction = function(scope) {

		$http({
			method: 'PUT',
			url: scope.data_source,
			data: angular.toJson(scope.transactionData)
		})
		.then(function(response){
			console.log("done");
			return true;
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
					sum = sum + eval(obj.amount);
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

		scope.data_source = this.lastFiveUrl;
		this.getIncomeExpenseData(scope)
		.then(function(data){
			this.lastFiveTransactions = data;
			that.lastFiveTransactions = data;
			scope.lastFiveTransactions = data;
			return true;
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

	
		transData = eval('this.'+transactionType+'Data');
		scopeTransData = eval('scope.'+transactionType+'Data');
		
		if(Object.keys(transData).length === 0){
			console.log("cms here");
			scope.data_source = eval('this.'+transactionType+'Url');
			this.getIncomeExpenseData(scope)
			.then(function(data){
				transData = data;
			});
		}

		$timeout( function(){
			scopeTransData = transData;
			scope.transactionData = scopeTransData;

			if(transactionType == 'income'){
				scope.showPayer = true;
			} else if( transactionType == 'expense') {
				scope.showPayee = true;
			} 
			usSpinnerService.stop('spinner-1');
		}, 3000);
		
		scope.recurringData = eval('this.recurring'+transactionType+'Data');
		if(transactionType == 'income'){
			scope.data_source = this.recurringIncomeUrl;
		} else if( transactionType == 'expense') {
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