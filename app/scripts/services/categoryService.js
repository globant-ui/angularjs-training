'use strict';

angular.module('myAppApp')
  .factory('categoryService', function(){
        var IncomeCategory = [
            'business',
            'salary',
            'interests on deposites'
        ];
        
        var ExpenseCategory = [
            'rent',
            'travel',
            'party',
            'office',
            'studies',
            'shopping'
        ];
        
        var mode = [
            'cash',
            'electronic_transfer',
            'cheque',
            'credit_card'
        ]
        
        return{
            setCategory : function(type) {
                if (type == 'income') {
                    return IncomeCategory;   
                } else {
                    return ExpenseCategory
                }
            },
            
            getMode : function(){
                return mode;
            }
        }
  });
