
myapp.service("expenseManagerIncomeExpenseService",function($http,$q){
	this.incomeData = this.expenseData = {};

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
		scope.addNew = {transactionId:"",payer:"",payee:"",category:"",subcategory:"",amount:"",date:"",modeOfPayment:"",notes:"",transType:""};	
		scope.showAddTransaction = false;
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
		this.incomeData = scope.incomeData;
	}

	this.storeExpenseData = function(scope){
		this.expenseData = scope.expenseData;
	}
	
	this.getIncomeData = function(){
		return this.incomeData;
	}

	this.getExpenseData = function(){
		return this.expenseData;
	}

	this.getCurrentDate = function(){
		var today = new Date();
	    var dd = today.getDate();
	    var mm = today.getMonth()+1; //January is 0!

	    var yyyy = today.getFullYear();
	    if(dd<10){
	        dd='0'+dd
	    } 
	    if(mm<10){
	        mm='0'+mm
	    } 
	    var today = dd+'-'+mm+'-'+yyyy;
	    return today;
	}

});