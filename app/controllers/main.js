angular.module("myapp", []).controller("mainctrl", function($scope) {
    $scope.transaction = {};
    $scope.transValue = null;
    
    $scope.IncomeTransactions = [
        {
            "transactionId" : "001",
            "payer" : "Globant",
            "payee" : "Jack",
            "category" : "Salary",
            "subCategory" : "abc",
            "amount" : "20000",
            "date" : "01-10-2015",
            "modeOfPayment" : "electronic pay",
            "notes" : "notes",
            "type" : "income"
        },
        {
            "transactionId" : "002",
            "payer" : "Globant",
            "payee" : "Jack",
            "category" : "Salary",
            "subCategory" : "abc",
            "amount" : "20000",
            "date" : "01-11-2015",
            "modeOfPayment" : "electronic pay",
            "notes" : "notes",
            "type" : "income"    
        }
    ];
    
    $scope.ExpenseTransactions = [
        {
            "transactionId" : "101",
            "payer" : "Jack",
            "payee" : "HotelSkyBlue",
            "category" : "Bill",
            "subCategory" : "lunch bill",
            "amount" : "1000",
            "date" : "03-01-2016",
            "modeOfPayment" : "Debit Card",
            "notes" : "notes",
            "type" : "expense"
        },
        {
            "transactionId" : "102",
            "payer" : "Jack",
            "payee" : "CCD",
            "category" : "Bill",
            "subCategory" : "cofee bill",
            "amount" : "300",
            "date" : "03-12-2015",
            "modeOfPayment" : "cash",
            "notes" : "notes",
            "type" : "expense"    
        }
    ];
            
    $scope.showIncome = function() {
        $scope.TransValue = $scope.IncomeTransactions;
        this.calculatetotalIncome();
    }
    
    $scope.showExpense = function() {
        $scope.TransValue = $scope.ExpenseTransactions;
        this.calculatetotalExpense();
        this.calculatetotalBalance();
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
});