/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


myApp.factory("recurringTransactionService", ['transactionService', '$rootScope', function(transactionService, $rootScope) { 
        var recurringTransactionDetails = [{
                transactionID: 101,
                payer: 'Globant',
                payee: 'self',
                category: 'Salary',
                subCategory: {
                    parentcategoryName: 'Salary',
                    subCategoryName: 'Salary'
                },
                amount: 50000,
                mop: 'Electronic Transfer',
                date: new Date("march 1, 2016 14:13:00"),
                notes: 'Ontime',
                type: 'Income',
                recurringType: 'Monthly'
            }, {
                transactionID: 102,
                payer: 'self',
                payee: 'Satish Joshi',
                category: 'Hose 1Rent',
                subCategory: {
                    parentcategoryName: 'Rent',
                    subCategoryName: 'House Rent'
                },
                amount: 10000,
                mop: 'Electronic Transfer',
                date: new Date("march 5, 2016 16:13:00"),
                notes: 'House rent',
                type: 'Income',
                recurringType: 'Monthly'
            }, {
                transactionID: 103,
                payer: 'self',
                payee: 'Miami',
                category: 'Monthly Emi',
                subCategory: {
                    parentcategoryName: 'Monthly Emi',
                    subCategoryName: 'Monthly Emi'
                },
                amount: 33000,
                mop: 'Electronic Transfer',
                date: new Date("march 10, 2016 16:13:00"),
                notes: 'Home Monthly Emi',
                type: 'Expense',
                recurringType: 'Monthly'
            }, {
                transactionID: 104,
                payer: 'self',
                payee: 'LIC',
                category: 'Investment',
                subCategory: {
                    parentcategoryName: 'Investment',
                    subCategoryName: 'Lic'
                },
                amount: 2000,
                mop: 'Debit Card',
                date: new Date("march 28, 2016 16:13:00"),
                notes: 'lunch and snax',
                type: 'Expense',
                recurringType: 'Yearly'
            }, {
                transactionID: 105,
                payer: 'self',
                payee: 'Reliance Fund',
                category: 'Investment',
                subCategory: {
                    parentcategoryName: 'Investment',
                    subCategoryName: 'Mutual fund'
                },
                amount: 10000,
                mop: 'Electronic Transfer',
                date: new Date("march 22, 2016 16:13:00"),
                notes: 'Office study books',
                type: 'Expense',
                recurringType: 'Quarterly'

            },{
                transactionID: 106,
                payer: 'self',
                payee: 'Kotak Fund',
                category: 'Investment',
                subCategory: {
                    parentcategoryName: 'Investment',
                    subCategoryName: 'Mutual fund'
                },
                amount: 20000,
                mop: 'Electronic Transfer',
                date: new Date("march 2, 2016 16:13:00"),
                notes: 'Office study books',
                type: 'Expense',
                recurringType: 'Monthly'

            },{
                transactionID: 107,
                payer: 'self',
                payee: 'LIC',
                category: 'Investment',
                subCategory: {
                    parentcategoryName: 'Investment',
                    subCategoryName: 'Lic'
                },
                amount: 2000,
                mop: 'Electronic Transfer',
                date: new Date("march 1, 2016 16:13:00"),
                notes: 'Office study books',
                type: 'Expense',
                recurringType: 'Monthly'

            },{
                transactionID: 108,
                payer: 'self',
                payee: 'Satish Joshi',
                category: 'Hose 2 Rent',
                subCategory: {
                    parentcategoryName: 'Rent',
                    subCategoryName: 'House Rent'
                },
                amount: 18000,
                mop: 'Electronic Transfer',
                date: new Date("march 1, 2016 16:13:00"),
                notes: 'House rent',
                type: 'Income',
                recurringType: 'Monthly'
            },
        ];
        return{
            getRecurringTransactionList: function() {
                return recurringTransactionDetails;
            },
            //sort Recurring Transaction List
            sortReccuringTransactionArrayonDate: function(a, b) {
                return new Date(a.date).getTime() - new Date(b.date).getTime();
            },
            //filter Recurring Transaction List to display first 7 upcoming transacion in card view
            filterRecurringTransactionList: function() {
                recurringTransactionList = [];
                var todayDate = new Date();
                recurringTransactionDetails.sort(this.sortReccuringTransactionArrayonDate);
                for (var i = 0; i < recurringTransactionDetails.length; i++) {
                    if (recurringTransactionDetails[i].date >= todayDate) {
                        recurringTransactionList.push(recurringTransactionDetails[i])
                    }
                }
                return recurringTransactionList;
            },
            deleteRecurringTransaction: function(index) {
                recurringTransactionList.splice(index, 1);
            },
            addRecurringTransaction: function(index) {
                var recurringTransaction = angular.copy(recurringTransactionList[index]);
                
                var recurringTransactionDate = recurringTransactionList[index].date;
                if (recurringTransaction.recurringType === 'Quarterly') {
                    recurringTransactionDate.setMonth(recurringTransactionDate.getMonth() + 3);
                } else if (recurringTransaction.recurringType === "Yearly") {
                    recurringTransactionDate.setYear(recurringTransactionDate.getYear() + 1);
                } else if (recurringTransaction.recurringType === "Monthly") {
                    recurringTransactionDate.setMonth(recurringTransactionDate.getMonth() + 1);
                }
                //add the recurringTransaction to the income/expense and update the amounts
                transactionService.addTransaction(recurringTransaction, transactionService.getTransactionAmountData());
                
                //broad cast the change of Recurring transaction change
                $rootScope.$broadcast('recurringtransactionchange');
            }
        };
    }]);