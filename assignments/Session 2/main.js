var myapp = angular.module("expenseManagerApp",[]);

myapp.controller("showIncomeExpenseController",function($scope){
	$scope.showIncome = false;
	$scope.showExpense = true;
	$scope.balance = "150000";
	$scope.totalExpenses = "1500";
	$scope.totalIncome = "15000";
	$scope.ReportData  = [ 
	{transactionId:"1",payer:"Globant",payee:"Ashwini",category:"",subcategory:"",amount:"20000",date:"01-01-2016",modeOfPayment:"electronic_transfer",notes:"Cash deposited",type:"Income"},
	{transactionId:"2",payer:"Ashwini",payee:"IdeaCellular",category:"",subcategory:"",amount:"1000",date:"24-01-2016",modeOfPayment:"Cheque",notes:"Paying bill",type:"Expense"}];
	
	$scope.showIncomeDetails = function(){
		$scope.IncomeDetails = {payer: $scope.ReportData[0].payer,amount: $scope.ReportData[0].amount, date: $scope.ReportData[0].date,modeOfPayment: $scope.ReportData[0].modeOfPayment};
		$scope.showIncome = true;
		$scope.showExpense= true;
		
	}
	
	$scope.showExpenseDetails = function(){
		$scope.ExpenseDetails = {payee: $scope.ReportData[1].payee,amount: $scope.ReportData[1].amount, date: $scope.ReportData[1].date,modeOfPayment: $scope.ReportData[1].modeOfPayment};
		$scope.showIncome= false;
		$scope.showExpense= false;
	}
});

