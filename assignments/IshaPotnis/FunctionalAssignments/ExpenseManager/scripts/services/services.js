angular.module("myapp")
    .service('mainService', ['$http','$q',function($http,$q){
    this.editflag = false;
    this.incomeArr = [];
    this.expenseArr = [];
    this.index = -1;
    this.incomeType = "";
    this.incomeAmount = "";
    
    this.addIncome = function(){ 
    if(this.editflag == true){
        this.incomeArr[this.index].name = this.incomeType;
        this.incomeArr[this.index].value = this.incomeAmount;
    }else{
        this.incomeArr.push({ 'name':this.incomeType, 'value': this.incomeAmount});
    }
    }

    this.getIncome = function(){
         this.income_money = 0;
         self = this;
         angular.forEach(this.incomeArr, function(incomes){
            self.income_money = self.income_money + incomes.value;
        });
         return self.income_money;
    }
     this.getExpense = function(){
         this.expense_money = 0;
         self = this;
         angular.forEach(this.expenseArr, function(expenses){
            self.expense_money = self.expense_money + expenses.value;
        });
         return self.expense_money;
    }
    
    this.postData = function (){
         var newlocalData = {"name": "Business",
                    "value": 5055};
           
            var req = {
                     method: 'post',
                     url:'http://localhost:8080/scripts/data.json',
                     data: newlocalData,
                    headers: {
        'Content-Type': 'application/json', 
        'Accept': 'application/json' 
    },
                    };

        return $http(req);
    }

    this.getData = function() {
        
    var req = {
                 method: 'get',
                 url:'http://localhost:8080/scripts/data.json'
               
            };
    return $http(req);
    }
   
    
    this.addExpense = function(){ 
    if(this.editflag == true){
        this.expenseArr[this.index].category = this.expenseType;
        this.expenseArr[this.index].value = this.expenseAmount;
        this.expenseArr[this.index].mode = this.mode;
        this.expenseArr[this.index].date = this.expenseDate;
        this.expenseArr[this.index].payee = this.payee;
    }else{     
        this.expenseArr.push({ 'category':this.expenseType, 'value': this.expenseAmount, 'mode':this.mode , 'date':this.expenseDate , 'payee':this.payee });
    }
}
}]);
