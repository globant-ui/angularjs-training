'use strict';

angular.module('myAppApp')
  .factory('expenseService', ['$http', '$q', function($http, $q){
        var expenseData = [];
        
        return{
            setData:function(targetUrl,type) {
                return $http.get(targetUrl)
                    .then(function(response){
                        if(typeof response.data === 'object'){
                            expenseData = $.map(response.data, function(value,index){
                                return [value];
                            });
                            return response.data;
                        } else {
                            return $q.reject(response.data);
                        }
                    }, function(response){
                        return $q.reject(response.data);
                    });
            },
            
            // getData:function(){
            //     return expenseData;
            // },
            
            postData : function(item, type) {
                console.log(expenseData);
                if (item == null) {
                    return expenseData;
                } else {
                    expenseData.push(item);
                    return expenseData;
                }
            }
        }
  }]);
