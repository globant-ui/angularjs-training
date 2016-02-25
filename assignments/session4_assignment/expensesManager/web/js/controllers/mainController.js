/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

myApp.controller("mainController", ['transactionSetrvice', function(transactionSetrvice) {
        var self = this;
        self.descending = false;
        self.transaction = {};
        self.amountData = {
            totalIncomeAmount: 0, totalExpenseAmount: 0, availableBalance: 0
        };
        self.transactionDetails = transactionSetrvice.transactionList();


        self.sortBy = function(columnName) {
            transactionSetrvice.sortBy(self, columnName);
        };

        self.amountData.totalIncomeAmount = transactionSetrvice.sum(self.transactionDetails, "amount", "Income");
        self.amountData.totalExpenseAmount = transactionSetrvice.sum(self.transactionDetails, "amount", "Expense");
        self.amountData.availableBalance = self.amountData.totalIncomeAmount - self.amountData.totalExpenseAmount;

        self.addTransaction = function() {
            self.transaction.transactionID = transactionSetrvice.generateTransactionId();
            self.amountData = transactionSetrvice.addTransaction(self.transaction);
            self.transaction = {};
            self.transactionDetails = transactionSetrvice.transactionList();
        };

        self.editTransactionFlag = false;

        self.editTransaction = function(transaction) {
            self.editTransactionFlag = true;
            self.transaction = transactionSetrvice.editTransaction(transaction);
        };
        self.setTransaction = function() {
            self.updatedTransactionandAmountData = transactionSetrvice.setTransaction(self.transaction, self.amountData);
            self.transaction = self.updatedTransactionandAmountData.updatedTransaction;
            self.amountData = self.updatedTransactionandAmountData.updatedamountData;
            self.editTransactionFlag = false;
            self.transaction = {};
        };
        self.deleteTransaction = function(transaction) {
            self.amountData = transactionSetrvice.deleteTransaction(transaction, self.amountData);
            self.transactionDetails = transactionSetrvice.transactionList();
        };
        self.cancelTransaction = function() {
            self.transaction = {};
            self.editTransactionFlag = false;
        };
    }]);
