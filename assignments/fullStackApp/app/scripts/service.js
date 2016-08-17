/**
 * Created by vshelar on 28-01-2016.
 */


'use strict';

angular.module('myApp')
    .factory('updateService', ['$location','$rootScope','$http',function ($location,$rootScope,$http) {

        var expenseRecords = [
    {
    transactionId:1,
    payer:"vijay",
    payee:"abc",
    category:"category1",
    subCategory:"subcategory1",
    amount:"200",
    date:"5-9-2015",
    modeOfPayment:"online",
    noteType:"expense"
  },
  {
    transactionId:2,
    payer:"ajay",
    payee:"abc",
    category:"category1",
    subCategory:"subcategory1",
    amount:"180",
    date:"8-1-2016",
    modeOfPayment:"cash",
    noteType:"expense"
  },
  {
    transactionId:3,
    payer:"ramesh",
    payee:"abc",
    category:"category1",
    subCategory:"subcategory1",
    amount:"200",
    date:"1-1-2016",
    modeOfPayment:"cash",
    noteType:"expense"
  },
  {
    transactionId:4,
    payer:"umesh",
    payee:"airtel",
    category:"category1",
    subCategory:"subcategory1",
    amount:"180",
    date:"1-8-2015",
    modeOfPayment:"cash",
    noteType:"expense"
  }];

  var incomeRecords = [
    {
    transactionId:1,
    payer:"vijay",
    payee:"company name",
    category:"category1",
    subCategory:"subcategory1",
    amount:"2000",
    date:"1-2-2016",
    modeOfPayment:"online credit",
    noteType:"income"
  },
  {
    transactionId:2,
    payer:"ajay",
    payee:"abc",
    category:"category1",
    subCategory:"subcategory1",
    amount:"1000",
    date:"8-9-2016",
    modeOfPayment:"cash",
    noteType:"income"
  },
  {
    transactionId:3,
    payer:"ramesh",
    payee:"abc",
    category:"category1",
    subCategory:"subcategory1",
    amount:"2000",
    date:"1-1-2016",
    modeOfPayment:"cash",
    noteType:"income"
  },
  {
    transactionId:4,
    payer:"umesh",
    payee:"abc",
    category:"category1",
    subCategory:"subcategory1",
    amount:"5000",
    date:"9-1-2015",
    modeOfPayment:"cash",
    noteType:"income"
  }];

  var isRecordExist = function(array,user){
                    for(var i = 0; i < array.length; i++) {
                    if(user.transactionId == array[i].transactionId) {
                        array[i] = user;
                        return true;
                    } else {
                        return false;
                    }
                 }
            }

    var updateService = {
            /*Get expense record array service*/
            getExpenseRecords:function(){

                return expenseRecords;
            },

            /*Get Income record array service*/
             getIncomeRecords:function(){

                return incomeRecords;
            },
            /*Update record array service*/
            update:function(isUpdateIncome,user){
                
                console.log("update service called");
                if(isUpdateIncome) {
                    if(!isRecordExist(incomeRecords,user)){
                        incomeRecords.push(user);
                    }
                    $location.path('/incomeDetails');
                } else {
                    if(!isRecordExist(expenseRecords,user)){
                        expenseRecords.push(user);
                    }
                    $location.path('/expenseDetails');
                }

                $rootScope.$broadcast('update found');
            },
            /*Delete record array service*/
            delete:function(records,record){
                console.log("delete service called");
                var index = -1;
                for(var i = 0; i < records.length; i++) {
                    if(record.transactionId == records[i].transactionId) {
                        console.log("record found");
                        index = i;
                        records.splice(index,1);
                        console.log("record deleted");
                        $rootScope.$broadcast('update found');
                        break;
                    }
                }
                
                
            },

            listIncome : function(){
            //var self = this;
            return $http({
                        method: 'GET',
                        url: 'http://demo1468896.mockable.io/income'
                }).then(function successCallback(response){
                    console.log(response);

                }, function errorCallback(error){
                    console.log("error");
                });
        }
        };
        return updateService;
    }]);