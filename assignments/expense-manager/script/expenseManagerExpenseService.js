
myapp.service("expenseManagerExpenseService",function($http,$q){
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
		scope.addNewExpense.amount = parseInt(scope.expenseData[index].amount);

		scope.addNewExpense.indexData = true;
	}
	this.deleteExpense = function(scope,index) {
		scope.expenseData.splice(index,1);
		$http({
			method: 'PUT',
			url: 'https://api.myjson.com/bins/1s12d',
			data: angular.toJson(scope.expenseData)
		})
		.then(function(response){
			console.log("done");
		});
		scope.showIncome= false;
		scope.showAddIncome= false;
		scope.addNewExpense = {transactionId:"",payer:"",payee:"",category:"",subcategory:"",amount:"",date:"",modeOfPayment:"",notes:"",type:""};
	}	
	this.getExpenseData = function() {
		return $http.get('https://api.myjson.com/bins/1s12d')
		.then(function(response){	
			if(typeof response.data === 'object') {
				return response.data;	
			} else {
				$q.reject(response.data);
			}
		},function errorCallback(response) {
			$q.reject(response.data);
		});
	}
});
