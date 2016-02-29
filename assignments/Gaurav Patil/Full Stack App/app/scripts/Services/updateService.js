angular.module("expensesApp").
service('updateService', function($http) {
    this.index = '';
    this.income_array = [];
    this.income_temp = {
        category: '',
        value: '',
        date: '',
        mode: '',
        message:''
    };

    this.exp_array = [];
    this.exp_temp = {
        date: '',
        value: '',
        category: '',
        payee: '',
        message:''
    };


    this.addIncome = function() {
        var self = this;
        $http({
            method: 'POST',
            url: 'http://demo1941123.mockable.io/income',
            data: this.income_temp
        }).then(function successCallback(response) {
            var newDate = new Date(response.data.date);
            response.data.date = newDate;
            self.income_array.push(response.data);
        }, function errorCallback(response) {
            console.log("error");
       });

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
            mode: '',
            message:''
        };
    };



    this.addExpense = function() {
        var self = this;
        $http({
            method: 'POST',
            url: 'http://demo1941123.mockable.io/expense',
            data: this.exp_temp
        }).then(function successCallback(response) {
            var newDate = new Date(response.data.date);
            response.data.date = newDate;
            self.exp_array.push(response.data);
        }, function errorCallback(response) {
            console.log("error");
       });

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
            payee: '',
            message:''
        };

    };

    this.deleteIncome = function() {
        var self = this;
        $http({
            method: 'DELETE',
            url: 'http://demo1941123.mockable.io/income'
        }).then(function successCallback(response) {
            var message = response.data.message;
            alert(message);
        }, function errorCallback(response) {
            console.log("error");
       });

        this.income_array.splice(this.index, 1);
    };

    this.deleteExpense = function() {
        var self = this;
        $http({
            method: 'DELETE',
            url: 'http://demo1941123.mockable.io/expense'
        }).then(function successCallback(response) {
            var message = response.data.message;
            alert(message);
        }, function errorCallback(response) {
            console.log("error");
       });

        this.exp_array.splice(this.index, 1);
    };

});
