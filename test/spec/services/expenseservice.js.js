'use strict';

describe('Service: expenseService.js', function () {

  // load the service's module
  beforeEach(module('myAppApp'));

  // instantiate service
  var expenseService.js;
  beforeEach(inject(function (_expenseService.js_) {
    expenseService.js = _expenseService.js_;
  }));

  it('should do something', function () {
    expect(!!expenseService.js).toBe(true);
  });

});
