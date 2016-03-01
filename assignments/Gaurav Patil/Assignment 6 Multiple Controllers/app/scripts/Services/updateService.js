angular.module("expensesApp").
service('updateService', function() {
    this.index = '';
    this.income_array = [];
    this.income_temp = {
        category: '',
        value: '',
        date: '',
        mode: ''
    };

    this.exp_array = [];
    this.exp_temp = {
        date: '',
        value: '',
        category: '',
        payee: ''
    };


    this.addIncome = function() {

        if (this.index == undefined || this.index === "") {
            this.income_array.push(this.income_temp);
        } else {
            this.income_array[this.index] = this.income_temp;
        }
        this.index = "";
        this.income_temp = {
            category: '',
            value: '',
            date: '',
            mode: ''
        };
    };



    this.addExpense = function() {
        if (this.index == undefined || this.index === "") {
            this.exp_array.push(this.exp_temp);
        } else {
            this.exp_array[this.index] = this.exp_temp;
        }
        this.index = "";
        this.exp_temp = {
            date: '',
            value: '',
            category: '',
            payee: ''
        };

    };

    this.deleteIncome = function() {
        this.income_array.splice(this.index, 1);
    };

    this.deleteExpense = function() {
        this.exp_array.splice(this.index, 1);
    };

});