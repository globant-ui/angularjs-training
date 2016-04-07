describe('TestAddIncomeExpenseControllerAnotherMethod',function(){
	var $controller;
	var mockCRUD;
	var $httpBackend;

	beforeEach(module("expenseManagerApp"));

	beforeEach(inject(function($injector) {
		$httpBackend = $injector.get('$httpBackend');
		mockCRUD = $injector.get('CRUD');		
	}));

	beforeEach(function() {
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();			
	});

	it('should add the transaction', function(){
		var scope = {};
		scope.transactionData = [];
		scope.data_source = 'https://api.myjson.com/bins/58x0u';
		scope.addNew = {transactionId:"5",payer:"Ashwini",payee:"Roshu",category:"Shopping",subcategory:"Emergency",amount:"70000",date:"2016-04-01",notes:"done",transType:"income",indexData:true,modeOfPayment:"Credit Card"};	
	
		$httpBackend.expectPOST(scope.data_source,scope.addNew).respond(true);

		mockCRUD.addTransactionSave(scope);
		
	});
});