/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

myApp.controller("mainController", [function() {
        var self = this;
        self.descending = false;
        self.income = {};
        self.expense = {};
        self.incomeDetails = [
            {transactionId: "101",
                incomeDescription: 'House1 Rent',
                date: new Date("january 13, 2016 11:13:00"),
                incomeAmount: 10000,
                incomeCategory: 'Rent',
                incomeSubCategory: {
                    parentCategoryName: 'Rent',
                    subCategoryName: "House Rent"
                },
//                type: "Income"
            },
            {transactionId: "102",
                incomeDescription: 'Deposit intrest',
                date: new Date("january 16, 2016 12:13:00"),
                incomeAmount: 3000,
                incomeCategory: 'Fixed Deposit',
                incomeSubCategory: {
                    parentCategoryName: 'Fixed Deposit',
                    subCategoryName: "Bank Interest"
                },
//                type: "Income"
            },
            {transactionId: "103",
                incomeDescription: 'Annual intrest',
                date: new Date("january 10, 2016 01:13:00"),
                incomeAmount: 10000,
                incomeCategory: 'Interest',
                incomeSubCategory: {
                    parentCategoryName: 'Interest',
                    subCategoryName: "Bank Interest"
                },
//                type: "Income"
            },
            {transactionId: "104",
                incomeDescription: 'Monthly salary',
                date: new Date("january 01, 2016 21:13:00"),
                incomeAmount: 45000,
                incomeCategory: 'Salary',
                incomeSubCategory: {
                    parentCategoryName: 'Salary',
                    subCategoryName: "Monthly Income"
                },
//                type: "Income"
            },
            {transactionId: "105",
                incomeDescription: 'House2 Rent',
                date: new Date("january 05, 2016 11:13:00"),
                incomeAmount: 7500,
                incomeCategory: 'Rent',
                incomeSubCategory: {
                    parentCategoryName: 'Rent',
                    subCategoryName: "House Rent"
                },
//                type: "Income"
            }
        ];
        self.expensesDetails = [
            {transactionId: "201",
                date: new Date("january 23, 2016 14:13:00"),
                payer: "Self",
                payee: "Pacifiec mall grocery store",
                expenseDescription: 'Grocery for the week',
                expenseAmount: 1000,
                expenseCategory: 'Grocery',
                modeofPayment: 'Cash',
//                type: "Expense"

            },
            {transactionId: "202",
                date: new Date("january 25, 2016 11:13:00"),
                payer: "Sunita Kumar",
                payee: "S.G.S mall",
                expenseDescription: 'Shopping',
                expenseAmount: 3000,
                expenseCategory: 'Shopping',
                modeofPayment: 'Credit Card',
//                type: "Expense"

            },
            {transactionId: "203",
                date: new Date("january 26, 2016 10:13:00"),
                payer: "Self",
                payee: "Girikand",
                expenseDescription: 'Trip',
                expenseAmount: 10000,
                expenseCategory: 'Travel',
                modeofPayment: 'Debit Card',
//                type: "Expense"

            },
            {transactionId: "204",
                date: new Date("january 01, 2016 19:13:00"),
                payer: "Self",
                payee: "Hotel marriot",
                expenseDescription: 'Others',
                expenseAmount: 2500,
                expenseCategory: 'Party',
                modeofPayment: 'Cash',
//                type: "Expense"

            },
            {transactionId: "205",
                date: new Date("january 25, 2016 16:13:00"),
                payer: "Vishal Kumar",
                payee: "S.G.S mall",
                expenseDescription: 'Extra expenses',
                expenseAmount: 3500,
                expenseCategory: 'Others',
                modeofPayment: 'Electronic Transfer',
//                type: "Expense"
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
        self.totalIncomeAmount = self.sum(self.incomeDetails, "incomeAmount");
        self.totalExpenseAmount = self.sum(self.expensesDetails, "expenseAmount");
        self.availableBalance = self.totalIncomeAmount - self.totalExpenseAmount;

        self.addIncome = function() {
            self.incomeDetails.push(self.income);
            self.totalIncomeAmount += parseFloat(self.income.incomeAmount);
            self.availableBalance += parseFloat(self.income.incomeAmount);
            self.income = {};
        };
        self.editIncomeFlag = false;
        self.selectedIncome = {};

        self.editIncome = function(income) {
            self.selectedIncome = income;
            self.editIncomeFlag = true;
            self.income.incomeDescription = income.incomeDescription;
            self.income.incomeAmount = income.incomeAmount;
            self.income.incomeCategory = income.incomeCategory;
            self.income.date = income.date;
            self.income.incomeSubCategory = {};
            self.income.incomeSubCategory.parentCategoryName = income.incomeCategory;
            self.income.incomeSubCategory.subCategoryName = income.incomeSubCategory.subCategoryName;
        };
        self.setIncome = function() {
            self.selectedIncome.incomeDescription = self.income.incomeDescription;
            if (parseFloat(self.selectedIncome.incomeAmount) !== parseFloat(self.income.incomeAmount)) {
                self.totalIncomeAmount-=parseFloat(self.selectedIncome.incomeAmount);
                self.totalIncomeAmount += parseFloat(self.income.incomeAmount);
                self.availableBalance += parseFloat(self.income.incomeAmount);
            }
            self.selectedIncome.incomeAmount = self.income.incomeAmount;
            self.selectedIncome.incomeCategory = self.income.incomeCategory;
            self.selectedIncome.date = self.income.date;
            self.selectedIncome.incomeSubCategory = {};
            self.selectedIncome.incomeSubCategory.parentCategoryName = self.income.incomeCategory;
            self.selectedIncome.incomeSubCategory.subCategoryName = self.income.incomeSubCategory.subCategoryName;
            self.editIncomeFlag = false;
            self.income = {};
        };
        self.deleteIncome = function(index) {
            self.incomeDetails.splice(index, 1);
        };
        self.cancelIncome = function() {
            self.income = {};
            self.editIncomeFlag = false;
        };
        self.addExpense = function() {
            self.expensesDetails.push(self.expense);
            self.totalExpenseAmount += parseFloat(self.expense.expenseAmount);
            self.availableBalance -= parseFloat(self.expense.expenseAmount);
            self.expense = {};
        };
        self.editExpenseFlag = false;
        self.selectedExpense = {};

        self.editExpense = function(expense) {
            self.selectedExpense = expense;
            self.editExpenseFlag = true;
            self.expense.expenseDescription = expense.expenseDescription;
            self.expense.expenseAmount = expense.expenseAmount;
            self.expense.expenseCategory = expense.expenseCategory;
            self.expense.modeofPayment = expense.modeofPayment;
            self.expense.date = expense.date;
            self.expense.payee = expense.payee;
            self.expense.payer = expense.payer;

        };

        self.setExpense = function() {
            self.selectedExpense.expenseDescription = self.expense.expenseDescription;
            if (parseFloat(self.selectedExpense.expenseAmount) !== parseFloat(self.expense.expenseAmount)) {
                self.totalExpenseAmount-=parseFloat(self.selectedExpense.expenseAmount);
                self.totalExpenseAmount += parseFloat(self.expense.expenseAmount);
                self.availableBalance -= parseFloat(self.expense.expenseAmount);
            }
            self.selectedExpense.expenseAmount = self.expense.expenseAmount;
            self.selectedExpense.expenseCategory = self.expense.expenseCategory;
            self.selectedExpense.modeofPayment = self.expense.modeofPayment;
            self.selectedExpense.date = self.expense.date;
            self.selectedExpense.payee = self.expense.payee;
            self.selectedExpense.payer = self.expense.payer;
            self.editExpenseFlag = false;
            self.expense = {};
        };
        self.deleteExpense = function(index) {
            self.expensesDetails.splice(index, 1);
        };
        self.cancelExpense = function() {
            self.expense = {};
            self.editExpenseFlag = false;
        };
    }]);
