angular.module("expenceManager").factory("httpInterceptor", ['$http', '$log', '$q', function($http, $log, $q){
		return{
			CRUD: function(action, data, type){
				 var deferred = $q.defer();
				 var url = "https://api.mongolab.com/api/1/databases/my-expense/collections/"+type;
				 var config = {
					params:{
						apiKey:"PoNM7e8qtgeQVbTNQA8X_RM77Iq3oPoX"
					}
				 };
				 if(action == "get"){
					 $http.get(url, config).then(
						function(response){
							deferred.resolve(response);
						},
						function(response){
							deferred.reject(response);
						}
					);	
				 }
				 else if(action == "put"){
					 $http.put(url + "/" + data._id.$oid, data, config).then(
						function(response){
							deferred.resolve(response);
						},
						function(response){
							deferred.reject(response);
						}
					);
				 }
				 else if(action == "post"){
					 $http.post(url, data, config).then(
						function(response){
							deferred.resolve(response);
						},
						function(response){
							deferred.reject(response);
						}
					);
				 }
				 else if(action == "delete"){
					 $http.delete(url + "/" + data._id.$oid, config).then(
						function(response){
							deferred.resolve(response);
						},
						function(response){
							deferred.reject(response);
						}
					);
				 }
				 return deferred.promise;
			}
		}
	}]);