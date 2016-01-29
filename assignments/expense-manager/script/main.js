var myapp = angular.module("expenseManagerApp",[]);

myapp.controller("showIncomeExpenseController",['$scope','expenseManagerIncomeService','expenseManagerExpenseService',function($scope,expenseManagerIncomeService,expenseManagerExpenseService){
	$scope.selfData="Ashwini";
	$scope.showIncome = false;
	$scope.showExpense = true;
	$scope.showAddIncome = false;
	$scope.showAddExpense = false;
	$scope.modeOfPayment = ["cash","electronic_transfer","cheque","credit_card"];
	$scope.category = ["Salary","Loan Installment","Shopping","Medicines","Freelancing","Saving","Bill"];
	$scope.subcategory = [
	"Full Time","Edu Loan","Electronic","Emergency","Part Time","Policies"
	];
	$scope.balance = "150000";
	$scope.totalExpenses = "1500";
	$scope.totalIncome = "15000";
	$scope.incomeData  = [ 
	{transactionId:"1",payer:"Globant",payee:"Ashwini",category:"Salary",subcategory:"Full Time",amount:20000,date:"01-01-2016",modeOfPayment:"electronic_transfer",notes:"Cash deposited",type:"Income"}];
	$scope.expenseData  = [ 
	{transactionId:"2",payer:"Ashwini",payee:"IdeaCellular",category:"Bill",subcategory:"Electronic",amount:10000,date:"24-01-2016",modeOfPayment:"cheque",notes:"Paying bill",type:"Expense"}];
	
	$scope.showIncomeDetails = function(){
		expenseManagerIncomeService.showIncomeDetails($scope);		
	}

	$scope.addIncome = function(){
		expenseManagerIncomeService.addIncome($scope);		
	}

	$scope.addIncomeSave = function(index){
		expenseManagerIncomeService.addIncomeSave($scope,index);		
	}

	$scope.editIncome = function(index){
		expenseManagerIncomeService.editIncome($scope,index);		
	}


	$scope.deleteIncome = function(index){
		expenseManagerIncomeService.deleteIncome($scope,index);		
	}


	/**************** Expense Details **********************/

	$scope.showExpenseDetails = function(){
		expenseManagerExpenseService.showExpenseDetails($scope);		
	}

	$scope.addExpense = function(){
		expenseManagerExpenseService.addExpense($scope);		
	}

	$scope.addExpenseSave = function(){
		expenseManagerExpenseService.addExpenseSave($scope);		
	}

	$scope.editExpense = function(index){
		expenseManagerExpenseService.editExpense($scope,index);		
	}


	$scope.deleteExpense = function(index){
		expenseManagerExpenseService.deleteExpense($scope,index);		
	}

}]);


