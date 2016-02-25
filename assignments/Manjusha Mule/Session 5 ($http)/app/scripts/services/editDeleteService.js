'use strict'
angular.module('ExpenseManager')
	.service('editDeleteService', function(){
		this.edit = false;
		this.editThis = 0;
		this.objToBeUpdated = {};
		this.oldAmount;

		this.EnableEdit = function(Obj, index){
			this.objToBeUpdated = Obj;
			this.editThis = index;
			this.edit = true;
			this.oldAmount = Obj.amount;
		}
});