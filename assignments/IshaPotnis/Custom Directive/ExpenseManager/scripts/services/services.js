angular.module("myapp")
    .service('mainService', ['$http','$q',function($http,$q){
    this.editflag = false;
    this.incomeArr = [];
    this.expenseArr = [];
    this.index = -1;
    this.incomeType = "";
    this.incomeAmount = "";
    
    this.recurringTransactions = [{ person : "Mr Jason", mode : "Cash", subcategory : "Rent", notes : "Abc",amount : 1000,category : "Expense",  type : "Monthly", date: new Date("March 1, 2016 14:13:00")},
                         { person : "Mr Paul", mode : "Credit card", subcategory : "Travel", notes : "Abc", amount : 2000,category : "Expense", type : "Monthly", date: new Date("April 5, 2016 16:13:00")},
                         { person : "Mr Smith", mode : "Cash", subcategory : "Rent", notes : "Abc",amount : 1000,category : "Expense", type : "Monthly", date: new Date("May 4, 2016 16:13:00")}
                        ];
    this.addIncome = function(){ 
    if(this.editflag == true){
        this.incomeArr[this.index].subcategory = this.sourcegain.subcategory;
        this.incomeArr[this.index].amount = this.sourcegain.amount;
        this.incomeArr[this.index].mode = this.sourcegain.mode;
        this.incomeArr[this.index].date = this.sourcegain.date;
        this.incomeArr[this.index].person = this.sourcegain.person;
    }else{
        this.incomeArr.push({ 'subcategory':this.sourcegain.subcategory, 'amount': this.sourcegain.amount, 'mode':this.sourcegain.mode , 'date':this.sourcegain.date , 'person':this.sourcegain.person });
    }
    }

    this.getIncome = function(){
        this.income_money = 0;
        self = this;
        angular.forEach(this.incomeArr, function(incomes){
            self.income_money = self.income_money + incomes.amount;
        });
         return self.income_money;
    }
    this.getExpense = function(){
        this.expense_money = 0;
        self = this;
        angular.forEach(this.expenseArr, function(expenses){
            self.expense_money = self.expense_money + expenses.amount;
        });
        return self.expense_money;
    }
    
    this.postExpense = function (){
        var newlocalData = this.transaction;
        var req = {
                    method: 'POST',
                    url:'http://localhost:3000/expense',
                    data: newlocalData,
                    headers: {
                        'content-type': 'application/json',
                        Accept: 'application/json'
                    }
                };

        return $http(req);
    }

    this.postIncome = function (){
         var newlocalData = this.sourcegain;
            var req = {
                     method: 'POST',
                     url:'http://localhost:3000/income',
                    // url:'http://192.168.2.87:9090/api/income',
                     data: newlocalData,
                     headers: {
                        'content-type': 'application/json',
                        Accept: 'application/json'
                     }
                    };

        return $http(req);
    }

this.deleteExpense = function (id){
         var reqUrl = 'http://localhost:3000/expense/' + id;

            var req = {
                     method: 'DELETE',
                     url : reqUrl,
                     headers: {
                        'content-type': 'application/json',
                        Accept: 'application/json'
                     }
                    };

        return $http(req);
    }

this.deleteIncome = function (id){
         var reqUrl = 'http://localhost:3000/income/' + id;

            var req = {
                     method: 'DELETE',
                     url : reqUrl,
                     headers: {
                        'content-type': 'application/json',
                        Accept: 'application/json'
                     }
                    };

        return $http(req);
    }

this.putIncome = function (id){
         var newlocalData = this.sourcegain;
         var reqUrl = 'http://localhost:3000/income/' + id;

            var req = {
                     method: 'PUT',
                     url : reqUrl,
                     data: newlocalData,
                     headers: {
                        'content-type': 'application/json',
                        Accept: 'application/json'
                     }
                    };

        return $http(req);
    }

this.putExpense = function (id){
        var newlocalData = this.transaction;
        var reqUrl = 'http://localhost:3000/expense/' + id;

            var req = {
                     method: 'PUT',
                     url : reqUrl,
                     data: newlocalData,
                     headers: {
                        'content-type': 'application/json',
                        Accept: 'application/json'
                     }
                    };

        return $http(req);
    }


    this.getIncomeData = function() {
        
    var req = {
                 method: 'get',
                 url:'http://localhost:3000/income'
            };
    return $http(req);
    }
   
this.getExpenseData = function() {
        
    var req = {
                 method: 'get',
                 url:'http://localhost:3000/expense'
               
            };
    return $http(req);
    }
   
    
    this.addExpense = function(){ 
    if(this.editflag == true){
        this.expenseArr[this.index].subcategory = this.transaction.subcategory;
        this.expenseArr[this.index].amount = this.transaction.amount;
        this.expenseArr[this.index].mode = this.transaction.mode;
        this.expenseArr[this.index].date = this.transaction.date;
        this.expenseArr[this.index].person = this.transaction.person;

    }else{     
        this.expenseArr.push({ 'subcategory':this.transaction.subcategory, 'amount': this.transaction.amount, 'mode':this.transaction.mode , 'date':this.transaction.date , 'person':this.transaction.person });
    }
}
}]);
