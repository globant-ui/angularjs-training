'use strict';

describe('Controller: ExpenseDetailsCtrl', function () {

  // load the controller's module
  beforeEach(module('myApp'));

  var AboutCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AboutCtrl = $controller('ExpenseDetailsCtrl', {
      $scope: scope
    });
  }));

  it('varible initialization done', function () {
    expect();
  });
});
