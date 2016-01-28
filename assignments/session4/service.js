/**
 * Created by vshelar on 28-01-2016.
 */


'use strict';

angular.module('myApp')
    .factory('updateService', function () {

        var updateService = {
            update:function(array,user){
                console.log("update service called");
                array.push(user);
            },
            delete:function(records,record){
                console.log("delete service called");
                var index = -1;
                for(var i = 0; i < records.length; i++) {
                    if(record.transactionId == records[i].transactionId) {
                        index = i;
                    }
                }
                records.splice(index,1);
            }
        };
        return updateService;
    });