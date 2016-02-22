/**
 * Created by vshelar on 28-01-2016.
 */


'use strict';

angular.module('myApp')
    .factory('updateService', function () {

        var updateService = {
/*Get expense record array service*/
            getExpenseRecords:function(){

                return [
    {
    transactionId:1,
    payer:"vijay",
    payee:"abc",
    category:"payement",
    subCategory:"subcategory",
    amount:"200",
    date:"5-9-2015",
    modeOfPayment:"online",
    noteType:"expense"
  },
  {
    transactionId:2,
    payer:"ajay",
    payee:"abc",
    category:"payement",
    subCategory:"subcategory",
    amount:"180",
    date:"8-1-2016",
    modeOfPayment:"cash",
    noteType:"expense"
  },
  {
    transactionId:3,
    payer:"ramesh",
    payee:"abc",
    category:"payement",
    subCategory:"subcategory",
    amount:"200",
    date:"1-1-2016",
    modeOfPayment:"cash",
    noteType:"expense"
  },
  {
    transactionId:4,
    payer:"umesh",
    payee:"airtel",
    category:"payement",
    subCategory:"subcategory",
    amount:"180",
    date:"1-8-2015",
    modeOfPayment:"cash",
    noteType:"expense"
  }];
            },
/*Get Income record array service*/
 getIncomeRecords:function(){

                return [
    {
    transactionId:1,
    payer:"vijay",
    payee:"company name",
    category:"payement",
    subCategory:"subcategory",
    amount:"2000",
    date:"1-2-2016",
    modeOfPayment:"online credit",
    noteType:"income"
  },
  {
    transactionId:2,
    payer:"ajay",
    payee:"abc",
    category:"payement2",
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
    category:"payement",
    subCategory:"subcategory",
    amount:"2000",
    date:"1-1-2016",
    modeOfPayment:"cash",
    noteType:"income"
  },
  {
    transactionId:4,
    payer:"umesh",
    payee:"abc",
    category:"payement",
    subCategory:"subcategory",
    amount:"5000",
    date:"9-1-2015",
    modeOfPayment:"cash",
    noteType:"income"
  }];
            },
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