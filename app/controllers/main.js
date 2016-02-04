myapp.controller("mainctrl", function($scope, IncomeListService, ExpenseListService) {
    $scope.t = {};
    $scope.TransValue = null;
    $scope.add = true;
    $scope.view = true;
    $scope.incomeCount = 2;
    $scope.expenseCount = 2;
    $scope.modifyflag = false;
    // $scope.count = 0;
    
    var incomeSuccess = function(respData){
      console.log('Response: ',respData.data);
      $scope.IncomeTransactions =  respData.data;
    }
    var incomeFailure = function(errorData){
      console.log('Error Response: ',errorData);  
    }
    IncomeListService.getIncome().then(incomeSuccess,incomeFailure);
    
    var expenseSuccess = function(respData){
    //   console.log('Response: ',respData.data);
      $scope.ExpenseTransactions =  respData.data;
    }
    var expenseFailure = function(errorData){
    //   console.log('Error Response: ',errorData);  
    }
    ExpenseListService.getExpense().then(expenseSuccess,expenseFailure);
    
    $scope.showIncome = function() {
        $scope.add = false;
        $scope.view = true;
        $scope.TransValue = $scope.IncomeTransactions;
        this.calculatetotalIncome();
        this.calculatetotalExpense();
        this.calculatetotalBalance();
    }
    
    $scope.showExpense = function() {
        $scope.add = false;
        $scope.view = true;
        $scope.TransValue = $scope.ExpenseTransactions;
        this.calculatetotalIncome();
        this.calculatetotalExpense();
        this.calculatetotalBalance();
    }
    
    $scope.addTrans = function(){
        $scope.add = true;
        $scope.view = false;
        // $scope.t.transactionId = $scope.count;
        // console.log($scope.t);
    }
    
    $scope.calculatetotalIncome = function(){
        $scope.totalIncome = 0;
        $scope.IncomeTransactions.forEach(function(element) {
            $scope.totalIncome = parseFloat($scope.totalIncome) + parseFloat(element.amount);
        }, this);
        
    }
    
    $scope.calculatetotalExpense = function(){
        $scope.totalExpense = 0;
        $scope.ExpenseTransactions.forEach(function(element) {
            $scope.totalExpense = parseFloat($scope.totalExpense) + parseFloat(element.amount);
        }, this);
    }
    
    $scope.calculatetotalBalance = function(){
        $scope.totalBalance = parseFloat($scope.totalIncome) - parseFloat($scope.totalExpense);
    }
    
    $scope.modify = function(type,id){
        if (type == "income") {
            $scope.t = $scope.IncomeTransactions[id];
        } else {
            $scope.t = $scope.ExpenseTransactions[id];
        }
        $scope.add = true;
        $scope.view = false;
        console.log($scope.modifyflag);
        $scope.modifyflag = true;
        console.log($scope.modifyflag);
    }
    
    $scope.del = function(type,id){
        // console.log("delete");
        var pos = 1;
        if (type == "income") {            
            $scope.IncomeTransactions.forEach(function(element) {
                if(element.transactionId == id){
                    $scope.IncomeTransactions.splice(pos,1);
                }
                pos = pos + 1;
            }, this);
        } else {
            $scope.ExpenseTransactions.forEach(function(element) {
                if(element.transactionId == id){
                    $scope.ExpenseTransactions.splice(pos,1);
                }
                pos = pos + 1;
            }, this);
        }
    }
    
    $scope.submit = function(){
        if ($scope.modifyflag == "true") {
           console.log("modifyflag");
           $scope.modifyflag = false;
        } else {
            console.log($scope.modifyflag);
            if ($scope.t.type == "income") {
                $scope.IncomeTransactions.push($scope.t);
                $scope.incomeCount = $scope.incomeCount + 1;
            } else {
                $scope.ExpenseTransactions.push($scope.t);
                $scope.expenseCount = $scope.expenseCount + 1;                
            }            
        }
        // console.log($scope.IncomeTransactions);
        this.calculatetotalIncome();
        this.calculatetotalExpense();
        this.calculatetotalBalance();
        $scope.add = false;
        $scope.view = true;
        $scope.modifyflag = true;
    }
});