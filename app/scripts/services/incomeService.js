'use strict';

angular.module('myAppApp')
  .factory('incomeService', ['$http', '$q', function($http, $q){
        var incomeData = [];
        
        return{
            setData:function(targetUrl,type) {
                return $http.get(targetUrl)
                    .then(function(response){
                        if(typeof response.data === 'object'){
                            incomeData = $.map(response.data, function(value,index){
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
            
            postData : function(item) {
                console.log(incomeData);
                if (item == null) {
                    return incomeData;
                } else {
                    incomeData.push(item);
                    return incomeData;
                }
            },
            
            deleteData : function(id){
                console.log(incomeData);
                delete incomeData[id];
                return incomeData;
            }
        }
  }]);
