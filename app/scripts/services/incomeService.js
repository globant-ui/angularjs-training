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
                                value.date = new Date(value.date);
                                return [value];
                            });
                            id = incomeData.length;
                            return JSON.stringify(response.data);
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
                    if(element.transactionId == id){
                       id = arrayId;
                    }
                    arrayId = arrayId + 1;
                }, this);
                
                incomeData.splice(id,1);
                
                return incomeData;
            },
            
            getData : function(id){
                var arrayId = 0;
                incomeData.forEach(function(element) {
                    if(element.transactionId == id){
                        id = arrayId;
                    }
                    arrayId = arrayId + 1;
                }, this);
                
                return incomeData[id];
            },
            
            editData : function(item){
                console.log(item.transactionId);
                
            },
            
            getReportData : function(incategory){
                var reportData = [];
                var out = [];
                var total = 0;
                incomeData.forEach(function(element) {
                    if(element.category == incategory){
                        reportData.push(element);
                        total = total + parseInt(element.amount);
                    } 
                }, this);
                out.push(reportData,total);
                return out;
            }
        }
  }]);
