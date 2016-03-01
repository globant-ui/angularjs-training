'use strict';

describe('Controller: DashboardCtrl', function () {

  // load the controller's module
  beforeEach(module('myAppApp'));
    
  var DashboardCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DashboardCtrl = $controller('DashboardCtrl', {
      $scope: scope,
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(DashboardCtrl.awesomeThings.length).toBe(3);
  });
  
  it('toggleModal should work properly', function(){
      scope.toggleModal();
      expect(scope.showModal).toBe(true);
  });
  
  it('data should be feched properly from services.', function(){
      expect(scope.IncomeData).not.toBeNull();
      expect(scope.ExpenseData).not.toBeNull();
  });
  
//   it('total income should be more than 0 once calculateIncome function called', function(){
//       scope.calculateIncome();
//       expect(scope.totalIncome).toBeGreaterThan(0);
//   });
  
});
