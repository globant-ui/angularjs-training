'use strict';

/**
 * @ngdoc service
 * @name myAppApp.incomeService.js
 * @description
 * # incomeService.js
 * Service in the myAppApp.
 */
angular.module('myAppApp')
  .factory('dataService', ['$http', '$q', function($http, $q){
        // var incomelist;
        var incomeItem = [];
        var expenseItem = [];
        // var IncomeTransactions;
        return{
            getData:function(targetUrl,type) {
                return $http.get(targetUrl)
                    .then(function(response){
                        if(typeof response.data === 'object'){
                            if (type == 'income') {
                                // console.log(response.data);
                                incomeItem = $.map(response.data, function(value,index){
                                    return [value];
                                });
                                // console.log(incomeItem);
                                return response.data;
                            } else {
                                expenseItem = $.map(response.data, function(value,index){
                                    return [value];
                                });
                                // console.log(incomeItem);
                                return response.data;
                            }
                        } else {
                            return $q.reject(response.data);
                        }
                    }, function(response){
                        return $q.reject(response.data);
                    });
            },
            
            postData : function(item, type) {
            // console.log(item);
            if(type == 'income'){
                console.log(incomeItem);
                var l = incomeItem.push(item);
                console.log(l);
                console.log(incomeItem);
                return incomeItem;
            } else {
                expenseItem.push(item);
                return expenseItem;
            }
        }
        }
  }]);
