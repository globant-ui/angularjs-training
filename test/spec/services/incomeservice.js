'use strict';

describe('Service: incomeService', function () {

  // load the service's module
  beforeEach(module('myAppApp'));
  
  // instantiate service
  var incomeService;
  var $httpBackend;
  var authRequestHandler;
//   var $rootScope;
  
  beforeEach(inject(function (_incomeService_, $injector) {
    incomeService = _incomeService_;
    $httpBackend = $injector.get('$httpBackend');
    
    authRequestHandler = $httpBackend.when('GET','https://demo4989304.mockable.io/incomeTransactions')
            .respond(
                {
                    "transactionId" : "1",
                    "payer" : "Globant",
                    "payee" : "Jack",
                    "category" : "salary",
                    "subCategory" : "abc",
                    "amount" : "20000",
                    "date" : "01-10-2015",
                    "modeOfPayment" : "electronic pay",
                    "notes" : "notes",
                    "type" : "income"
                }
            );
            
    // $rootScope = $injector.get('$rootScope');
    
  }));
  
//   afterEach(function() {
//      $httpBackend.verifyNoOutstandingExpectation();
//      $httpBackend.verifyNoOutstandingRequest();
//    });

  it('should do something', function () {
    expect(!!incomeService).toBe(true);
  });
  
  it('should fetch authentication token', function() {
     $httpBackend.expectGET('https://demo4989304.mockable.io/incomeTransactions');
    //  var controller = createController();
    incomeService.setData('https://demo4989304.mockable.io/incomeTransactions','income')
        .then(function(response){
            expect(response.data).toEqual({
                    "transactionId" : "1",
                    "payer" : "Globant",
                    "payee" : "Jack",
                    "category" : "salary",
                    "subCategory" : "abc",
                    "amount" : "20000",
                    "date" : "01-10-2015",
                    "modeOfPayment" : "electronic pay",
                    "notes" : "notes",
                    "type" : "income"
                });
        });
    //  $httpBackend.flush();
   });

});
