'use strict';

angular.module('myAppApp')
  .factory('expenseService', ['$http', '$q', function($http, $q){
        var expenseData = [];
        var id;
        
        return{
            setData:function(targetUrl,type) {
                return $http.get(targetUrl)
                    .then(function(response){
                        if(typeof response.data === 'object'){
                            expenseData = $.map(response.data, function(value,index){
                                return [value];
                            });
                            id = expenseData.length;
                            return response.data;
                        } else {
                            return $q.reject(response.data);
                        }
                    }, function(response){
                        return $q.reject(response.data);
                    });
            },
            
            postData : function(item, type) {
                console.log(expenseData);
                if (item == null) {
                    return expenseData;
                } else {
                    id = id + 1;
                    item.transactionId = id.toString();
                    expenseData.push(item);
                    return expenseData;
                }
            },
            
            deleteData : function(id){
                var arrayId = 0;
            
                expenseData.forEach(function(element) {
                    if(expenseData[arrayId].transactionId == id){
                       id = arrayId;
                    }
                    arrayId = arrayId + 1;
                }, this);
                
                expenseData.splice(id,1);
                
                return expenseData;
            },
            
            getData : function(id){
                var arrayId = 0;
                expenseData.forEach(function(element) {
                    if(element.transactionId == id){
                        id = arrayId;
                    }
                    arrayId = arrayId + 1;
                }, this);
                
                return expenseData[id];
            }
        }
  }]);
