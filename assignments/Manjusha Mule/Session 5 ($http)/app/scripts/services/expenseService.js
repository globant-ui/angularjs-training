'use strict'
angular.module('ExpenseManager')
	.service('ExpenseService', function($q, $http){
  	
  		this.income = [];
  		this.expense = [];
  		

		this.addTransaction = function(TransactionObj, category){
			if(category){
				var self = this;
				$http({
 						 method: 'POST',
  						url: 'http://demo1468896.mockable.io/income',
  						data: TransactionObj
					}).then(function successCallback(response) {
 						TransactionObj.note += response.data.note;
 						self.income.push(TransactionObj);
 						}, function errorCallback(response) {
  						console.log("error");
  					});
				}
			else{
				var self = this;
				$http({
 						 method: 'POST',
  						url: 'http://demo1468896.mockable.io/expense',
  						data: TransactionObj
					}).then(function successCallback(response) {
 						TransactionObj.note += response.data.note;
 						self.expense.push(TransactionObj);
 						}, function errorCallback(response) {
  						console.log("error");
  					});
				}
		},
		
		this.deleteTransaction = function(index, category){
			if(category){
				var self = this;
				$http({
 						method: 'DELETE',
  						url: 'http://demo1468896.mockable.io/income',
					}).then(function successCallback(response) {
 						alert("Response : " + response.data.msg);
 						self.income.splice(index,1);
  					}, function errorCallback(response) {
  						console.log("error");
  					});
			}
			else{
				var self = this;
				$http({
 						 method: 'DELETE',
  						url: 'http://demo1468896.mockable.io/expense'
					}).then(function successCallback(response) {
 						alert("Response : " + response.data.msg);
 						self.expense.splice(index,1);
  					}, function errorCallback(response) {
  						console.log("error");
  					});
				}
		}

		this.editTransaction = function(index, category, TransactionObj)
		{
			if(category)
			{
				var self = this;
				$http({
 						method: 'PUT',
  						url: 'http://demo1468896.mockable.io/income'
					}).then(function successCallback(response) {
 						TransactionObj.note+=response.data.note;
 						self.income.splice(index,1);
						self.income.splice(index, 0, TransactionObj);
  					}, function errorCallback(response) {
  						console.log("error");
  					});
			}
			else
			{
				var self = this;
				$http({
 						method: 'PUT',
  						url: 'http://demo1468896.mockable.io/expense'
					}).then(function successCallback(response) {
 						TransactionObj.note+=response.data.note;
 						self.expense.splice(index,1);
						self.expense.splice(index, 0, TransactionObj);
  					}, function errorCallback(response) {
  						console.log("error");
  					});
			}
		}

		this.listIncome = function(){
			//var self = this;
			return $http({
 						method: 'GET',
  						url: 'http://demo1468896.mockable.io/income'
				});
		}
	});

