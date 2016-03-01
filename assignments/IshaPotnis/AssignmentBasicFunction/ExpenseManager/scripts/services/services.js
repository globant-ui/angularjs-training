angular.module("myapp")
    .service('mainService', ['$http','$q',function($http,$q){
    this.editflag = false;
    this.income = [];
    this.expense = [];
    this.index = -1;
    this.incomeType = "";
    this.incomeAmount = "";
    
    this.addIncome = function(){ 
    if(this.editflag == true){
        this.income[this.index].name = this.incomeType;
        this.income[this.index].value = this.incomeAmount;
    }else{
        this.income.push({ 'name':this.incomeType, 'value': this.incomeAmount});
    }
    }
    
    this.getData = function(){

            var defer = $q.defer();
            $http.get('http://localhost:8080/scripts/data.json').success(function(response){
                console.log(JSON.stringify(response));
                 defer.resolve(response);
            })
            return defer.promise;
        } 
    
    this.addExpense = function(){ 
    if(this.editflag == true){
        this.expense[this.index].category = this.expenseType;
        this.expense[this.index].value = this.expenseAmount;
        this.expense[this.index].mode = this.mode;
        this.expense[this.index].date = this.expenseDate;
        this.expense[this.index].payee = this.payee;
    }else{     
        this.expense.push({ 'category':this.expenseType, 'value': this.expenseAmount, 'mode':this.mode , 'date':this.expenseDate , 'payee':this.payee });
    }
}
}]);
