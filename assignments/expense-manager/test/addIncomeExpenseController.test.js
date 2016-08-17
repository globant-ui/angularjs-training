var $controller;
var mockCRUD;

describe('TestAddIncomeExpenseController',function(){
	beforeEach(module("expenseManagerApp"));

	beforeEach(inject(function(_$controller_) {
		$controller = _$controller_;
		mockCRUD = jasmine.createSpyObj('mySpy',['addTransaction','addTransactionSave','getIncomeExpenseData','getExpenseData','getIncomeData','validate']);
		
		mockCRUD.addTransaction.and.returnValue(true);
		
		mockCRUD.getIncomeExpenseData.and.returnValue(true);
		var incomeData = [{
			transactionId:2,
			payer:"Globant",
			payee:"Ashwini",
			category:"Salary",
			subcategory:"Full Time",
			amount:90000,
			date:"2016-04-01",
			notes:"done",
			transType:"income",
			indexData:true,
			modeOfPayment:"Credit Card"
			}];
		mockCRUD.getIncomeData.and.returnValue(incomeData);

		var expenseData = [{
			transactionId:3,
			payer:"Ashwini",
			payee:"Roshan",
			category:"Salary",
			subcategory:"Full Time",
			amount:90000,
			date:"2016-04-01",
			notes:"done",
			transType:"expense",
			indexData:true,
			modeOfPayment:"Credit Card"
			}];

		mockCRUD.getExpenseData.and.returnValue(expenseData);
		
	}));

	it('should add the added transaction', function(){
		var scope = {};
		scope.addNew = {transactionId:"5",payer:"Ashwini",payee:"Roshu",category:"Shopping",subcategory:"Emergency",amount:"70000",date:"2016-04-01",notes:"done",transType:"income",indexData:true,modeOfPayment:"Credit Card"};	
	
		var controller = $controller('addIncomeExpenseController',{$scope:scope,CRUD:mockCRUD});
		
		controller.addTransactionSave();
		
	});
});