'use strict';

describe('Controller: IncomeDetailsCtrl', function () {

  // load the controller's module
  beforeEach(module('myApp'));

  var AboutCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AboutCtrl = $controller('IncomeDetailsCtrl', {
      $scope: scope
    });
  }));

  it('varible initialization done', function () {
    expect();
  });
});
