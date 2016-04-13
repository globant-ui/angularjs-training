
angular.module("expenseManagerApp").service("serverCall",function($http){

	this.getData = function(url){
		return $http({
			method: 'GET',
			url: url
		});
	}

	this.putData = function(url,data){
		return $http({
			method: 'PUT',
			url: url,
			data: angular.toJson(data)
		});
	}


});