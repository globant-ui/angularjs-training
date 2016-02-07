
myapp.service("expenseManagerIncomeService",function($http,$q){
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
	this.addIncomeSave = function(scope) {
		
		scope.incomeData.push(scope.addNew);
		scope.addNew = {transactionId:"",payer:"",payee:"",category:"",subcategory:"",amount:"",date:"",modeOfPayment:"",notes:"",type:""};	
		scope.showAddIncome = false;
		scope.showAddExpense = false;
	}
	this.editIncome = function(scope,index){
		scope.showAddIncome = true;
		scope.addNew = scope.incomeData[index];
		scope.addNew.amount = parseInt(scope.incomeData[index].amount);

		scope.addNew.indexData = true;
	}
	this.deleteIncome = function(scope,index) {
		scope.incomeData.splice(index,1);
		$http({
			method: 'PUT',
			url: 'https://api.myjson.com/bins/4esbx',
			data: angular.toJson(scope.incomeData)
		})
		.then(function(response){
			console.log("done");
		});
		scope.showExpense= true;
		scope.addNew = {transactionId:"",payer:"",payee:"",category:"",subcategory:"",amount:"",date:"",modeOfPayment:"",notes:"",type:""};	
		scope.showAddExpense = false;
	}
	this.getIncomeData = function(){
		return $http({
		method: 'GET',
		url: 'https://api.myjson.com/bins/4esbx'
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
});