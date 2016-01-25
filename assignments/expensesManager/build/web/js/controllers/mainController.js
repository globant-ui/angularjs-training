/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

myApp.controller("mainController", [function() {
        var self = this;

        self.incomeAmount = 400;
        self.expenseAmount = 290;
        self.expenseAmount = 110;

        self.incomeDetails = [
            {transactionId: "101",
                incomeDescription: 'House1 Rent',
                date: "1/1/2016",
                incomeAmount: 10000,
                incomeCategory: 'Rent'
            },
            {transactionId: "102",
                incomeDescription: 'Fixed deposit intrest',
                date: "16/1/2016",
                incomeAmount: 3000,
                incomeCategory: 'Fixed Deposit'
            },
            {transactionId: "103",
                incomeDescription: 'Annual intrest',
                date: "10/1/2016",
                incomeAmount: 10000,
                incomeCategory: 'Interest'
            },
            {transactionId: "104",
                incomeDescription: 'Monthly salary',
                date: "1/1/2016",
                incomeAmount: 45000,
                incomeCategory: 'Salary'
            },
            {transactionId: "105",
                incomeDescription: 'House2 Rent',
                date: "5/1/2016",
                incomeAmount: 7500,
                incomeCategory: 'Rent'
            }
        ];
        
        self.expensesDetails = [
            {transactionId: "201",
                date: "13/1/2016",
                description: 'Grocery for the week',
                expenseAmount: 1000,
                category: 'Grocery',
                modeofPayment: 'Cash'
            },
            {transactionId: "202",
                date: "23/1/2016",
                description: 'Shopping',
                expenseAmount: 3000,
                category: 'Shopping',
                modeofPayment: 'Credit Card'
            },
            {transactionId: "202",
                date: "26/1/2016",
                description: 'Trip',
                expenseAmount: 10000,
                category: 'Travel',
                modeofPayment: 'Debit Card'
            },
            {transactionId: "202",
                date: "1/1/2016",
                description: 'Others',
                expenseAmount: 2500,
                category: 'Party',
                modeofPayment: 'Cash'
            },
            {transactionId: "202",
                date: "25/1/2016",
                description: 'Extra expenses',
                expenseAmount: 3500,
                category: 'Others',
                modeofPayment: 'Electronic Transfer'
            }
        ];
        
        self.sortBy = function(columnName) {
            self.column = columnName;
            self.descending = !self.descending;
        };

        self.sum = function(array, propertyName) {
            return array.reduce(function(a, b) {
                 return a + b[propertyName];
            }, 0);

        };

        self.incomeAmount = self.sum(self.incomeDetails, "incomeAmount");

        self.expenseAmount = self.sum(self.expensesDetails, "expenseAmount");

        self.availableBalance = self.incomeAmount - self.expenseAmount;
    }]);
