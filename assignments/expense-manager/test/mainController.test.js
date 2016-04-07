var $controller;
var mockCRUD;

describe('TestMainController',function(){
	beforeEach(module("expenseManagerApp"));

	beforeEach(inject(function(_$controller_) {
		$controller = _$controller_;
		mockCRUD = jasmine.createSpyObj('mySpy',['getTotalDetails']);
		mockCRUD.getTotalDetails.and.returnValue(true);
	}));

	it('should get the total details', function(){
		var controller = $controller('mainController',{$scope:{},CRUD:mockCRUD});
		controller.initData();
		expect(controller.success).toEqual(true);
	});
});