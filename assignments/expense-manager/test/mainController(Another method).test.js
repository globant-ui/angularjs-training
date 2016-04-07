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
		scope.data_source = 'https://api.myjson.com/bins/58x0u';
		
		var resultData = [{"transactionId":2,"payer":"Globant","payee":"Ashwini","category":"Salary","subcategory":"Full Time","amount":90000,"date":"2016-04-01","notes":"done","transType":"income","indexData":true,"modeOfPayment":"Credit Card"}];
		$httpBackend.expectGET(scope.data_source).respond(resultData);

		mockCRUD.getIncomeExpenseData(scope).then(function(data){
			expect(data).toEqual(resultData);
		});
		
	});
});