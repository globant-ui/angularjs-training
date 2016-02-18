'use strict';

angular.module('myAppApp')
  .factory('incomeService', ['$http', '$q', function($http, $q){
        var incomeData = [];
        var id;
        
        return{
            setData:function(targetUrl,type) {
                return $http.get(targetUrl)
                    .then(function(response){
                        if(typeof response.data === 'object'){
                            incomeData = $.map(response.data, function(value,index){
                                return [value];
                            });
                            id = incomeData.length;
                            return response.data;
                        } else {
                            return $q.reject(response.data);
                        }
                    }, function(response){
                        return $q.reject(response.data);
                    });
            },
             
            postData : function(item) {
                if (item == null) {
                    return incomeData;
                } else {
                    id = id + 1;
                    item.transactionId = id.toString();
                    incomeData.push(item);
                    console.log(incomeData);
                    return incomeData;
                }
            },
            
            deleteData : function(id){
                var arrayId = 0;
            
                incomeData.forEach(function(element) {
                    if(incomeData[arrayId].transactionId == id){
                       id = arrayId;
                    }
                    arrayId = arrayId + 1;
                }, this);
                
                incomeData.splice(id,1);
                
                return incomeData;
            }
        }
  }]);
