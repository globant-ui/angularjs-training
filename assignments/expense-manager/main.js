var myapp = angular.module("expenseManagerApp",[]);

myapp.controller("showIncomeExpenseController",function($scope){
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
		$scope.showIncome = true;
		$scope.showExpense= true;
		$scope.showAddIncome= false;
		$scope.showAddExpense = false;		
	}

	$scope.addIncome = function(){
		$scope.showAddIncome = true;
		$scope.addNew = {transactionId:"",payer:"",payee:"",category:"",subcategory:"",amount:"",date:"",modeOfPayment:"",notes:"",type:""};
	}

	$scope.addIncomeSave = function(index) {
		$scope.incomeData.push($scope.addNew);
		$scope.addNew = {transactionId:"",payer:"",payee:"",category:"",subcategory:"",amount:"",date:"",modeOfPayment:"",notes:"",type:""};	
		$scope.showAddIncome = false;
		$scope.showAddExpense = false;
	}

	$scope.editIncome = function(index){
		$scope.showAddIncome = true;
		$scope.addNew = $scope.incomeData[index];
		$scope.addNew.indexData = true;
	}

	$scope.deleteIncome = function(index) {
		$scope.incomeData.splice($scope.incomeData[index],1);
		$scope.showExpense= true;
		$scope.addNew = {transactionId:"",payer:"",payee:"",category:"",subcategory:"",amount:"",date:"",modeOfPayment:"",notes:"",type:""};	
		$scope.showAddIncome= true;
		$scope.showAddExpense = false;
	}

	/**************** Expense Details **********************/

	$scope.showExpenseDetails = function(){
		$scope.showIncome= false;
		$scope.showExpense= false;
		$scope.showAddIncome = false;
		$scope.showAddExpense = false;
	}

	$scope.addExpense = function(){
		$scope.showAddExpense = true;
		$scope.addNewExpense = {transactionId:"",payer:"",payee:"",category:"",subcategory:"",amount:"",date:"",modeOfPayment:"",notes:"",type:""};
	}

	$scope.addExpenseSave = function() {
		$scope.expenseData.push($scope.addNewExpense);
		$scope.addNewExpense = {transactionId:"",payer:"",payee:"",category:"",subcategory:"",amount:"",date:"",modeOfPayment:"",notes:"",type:""};
		$scope.showAddIncome = false;
		$scope.showAddExpense = false;
	}

	$scope.editExpense = function(index){
		$scope.showAddExpense = true;
		$scope.addNewExpense = $scope.expenseData[index];
		$scope.addNewExpense.indexData = true;
	}

	$scope.deleteExpense = function(index) {
		$scope.expenseData.splice($scope.expenseData[index],1);
		$scope.showIncome= false;
		$scope.showAddIncome= false;
		$scope.addNewExpense = {transactionId:"",payer:"",payee:"",category:"",subcategory:"",amount:"",date:"",modeOfPayment:"",notes:"",type:""};
		$scope.showAddExpense = true;
	}
});


