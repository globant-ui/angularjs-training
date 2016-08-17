var app = angular.module('myApp', []);

app.controller('MainCtrl', function($scope) {
  $scope.user = {};
  $scope.master = {};
  $scope.isShowExpense = false;
  $scope.isShowIncome = false;
  /*Handled show income button click*/
  $scope.showIncome = function() {
    $scope.isShowExpense = false;
    $scope.isShowIncome = true;
  };
  
  /*Handled show expense button click*/
  $scope.showExpense = function() {
    $scope.isShowExpense = true;
    $scope.isShowIncome = false;
  };

    $scope.updateIncome = function(user) {
        if($scope.userForm.$valid) {
            $scope.incomes.push(user);
            $scope.reset();
        }
    }

    $scope.updateExpense = function(user) {
        if($scope.userForm.$valid) {
            $scope.expenses.push(user);
            $scope.reset();
        }
    }

    $scope.deleteExpenseRecord = function(expense) {
        var index = -1;
        for(i = 0; i < $scope.expenses.length; i++) {
            if(expense.transactionId == $scope.expenses[i].transactionId) {
                index = i;
            }
        }
        $scope.expenses.splice(index,1);
    }

    $scope.deleteIncomeRecord = function(income) {
        var index = -1;
        for(i = 0; i < $scope.incomes.length; i++) {
            if(income.transactionId == $scope.incomes[i].transactionId) {
                index = i;
            }
        }
        $scope.incomes.splice(index,1);
    }

    $scope.submitForm = function() {
        console.log("form submit called");
    }

    $scope.reset = function() {
        $scope.user = angular.copy($scope.master);
    };
  /*Created expenses array*/
  $scope.expenses = [
    {
    transactionId:1,
    payer:"vijay",
    payee:"abc",
    category:"payement",
    subCategory:"subcategory",
    amount:"200",
    date:"5-9-2015",
    modeOfPayment:"online",
    noteType:"expense"
  },
  {
    transactionId:2,
    payer:"ajay",
    payee:"abc",
    category:"payement",
    subCategory:"subcategory",
    amount:"180",
    date:"8-1-2016",
    modeOfPayment:"cash",
    noteType:"expense"
  },
  {
    transactionId:3,
    payer:"ramesh",
    payee:"abc",
    category:"payement",
    subCategory:"subcategory",
    amount:"200",
    date:"1-1-2016",
    modeOfPayment:"cash",
    noteType:"expense"
  },
  {
    transactionId:4,
    payer:"umesh",
    payee:"airtel",
    category:"payement",
    subCategory:"subcategory",
    amount:"180",
    date:"1-8-2015",
    modeOfPayment:"cash",
    noteType:"expense"
  }];
  
  /*Created income array*/
  $scope.incomes = [
    {
    transactionId:1,
    payer:"vijay",
    payee:"company name",
    category:"payement",
    subCategory:"subcategory",
    amount:"2000",
    date:"1-2-2016",
    modeOfPayment:"online credit",
    noteType:"income"
  },
  {
    transactionId:2,
    payer:"ajay",
    payee:"abc",
    category:"payement2",
    subCategory:"subcategory1",
    amount:"1000",
    date:"8-9-2016",
    modeOfPayment:"cash",
    noteType:"income"
  },
  {
    transactionId:3,
    payer:"ramesh",
    payee:"abc",
    category:"payement",
    subCategory:"subcategory",
    amount:"2000",
    date:"1-1-2016",
    modeOfPayment:"cash",
    noteType:"income"
  },
  {
    transactionId:4,
    payer:"umesh",
    payee:"abc",
    category:"payement",
    subCategory:"subcategory",
    amount:"5000",
    date:"9-1-2015",
    modeOfPayment:"cash",
    noteType:"income"
  }];
});
