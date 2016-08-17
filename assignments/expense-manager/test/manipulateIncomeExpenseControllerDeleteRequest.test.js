describe('TestManipulateIncomeExpenseControllerPutRequest',function(){
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

	it('should delete the selected transaction', function(){
		var scope = {};
		scope.data_source = 'https://api.myjson.com/bins/58x0u';
		scope.transactionData = [{transactionId:"5",payer:"Ashwini",payee:"Roshu",category:"Shopping",subcategory:"Emergency",amount:"70000",date:"2016-04-01",notes:"done",transType:"income",indexData:true,modeOfPayment:"Credit Card"}];	
	
		$httpBackend.expectDELETE(scope.data_source,scope.transactionData).respond(true);

		mockCRUD.deleteTransaction(scope,0);
		//expect(scope.success).toEqual(true);
		
	});
});