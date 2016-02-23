var app = angular.module("myapp");
app.controller('aboutCtrl',['$scope',function($scope){}]);
app.controller('mainCtrl',['$scope','mainService',function($scope,mainService){}]);
app.controller('reportCtrl',['$scope','mainService',function($scope,mainService){    
    $scope.money = {
        income : 0,
        expense : 0,
        savings : 0
    };
    $scope.toggleVariable =true;
    if(mainService.incomeArr.length == 0){
        var fetchData = mainService.getIncomeData();
        fetchData.then(function(response){
        $scope.income = response.data;
        mainService.incomeArr = $scope.income;
        mainService.expenseArr = [];
        $scope.money.income = mainService.getIncome();
        $scope.money.expense = mainService.getExpense();
        $scope.money.savings = $scope.money.income - $scope.money.expense;
        });
         var fetchExpense = mainService.getExpenseData();
    fetchExpense.then(function(response){
        $scope.expense = response.data;
        mainService.expenseArr = $scope.expense;
    });
      $scope.money.expense = mainService.getExpense();
        $scope.money.savings = $scope.money.income - $scope.money.expense;
    } else {
        $scope.income = mainService.incomeArr;
        $scope.money.income = mainService.getIncome();
        $scope.money.expense = mainService.getExpense();
        $scope.money.savings = $scope.money.income - $scope.money.expense;        
    }
    $scope.expense = mainService.expenseArr;
    $scope.show_expense = function(){
         if($scope.toggleVariable)
        {
            $scope.toggleVariable = false;
        } else{
            $scope.toggleVariable = true;
        }
    }
}]);
app.controller('mainController',['$scope', '$http','expenseData' ,'mainService',function($scope,$http, expenseData, mainService){
	$scope.index = -1;
    $scope.toggleVariable = true;
    $scope.editflag = false;
    this.index = $scope.index;  
    $scope.income_types = [
                            "Salary",
                            "Business",
                            "Interest on deposit",
                            "Miscellaneous"
                          ];
    $scope.expense_types = [
                            "Rent",
                            "Travel",
                            "Party",
                            "Shopping",
                            "Miscellaneous"
                          ];
    $scope.mode = [
                    "Credit Card",
                    "Cash",
                    "Electronic Transfer"
                  ];

    $scope.money = {
        income : 0,
        expense : 0,
        savings : 0
    };

    var fetchData = mainService.getIncomeData ();
    fetchData.then(function(response){
        $scope.income = response.data;
        mainService.incomeArr = $scope.income;
        $scope.money.income = mainService.getIncome();
        $scope.money.savings = $scope.money.income - $scope.money.expense; 
    }); 

    var fetchExpense = mainService.getExpenseData();
    fetchExpense.then(function(response){
        $scope.expense = response.data;

        mainService.expenseArr = $scope.expense;
        $scope.money.expense = mainService.getExpense();
        $scope.money.savings = $scope.money.income - $scope.money.expense;
    });
    $scope.money.savings = $scope.money.income - $scope.money.expense;

    $scope.addIncome = function(){ 
        var trans = {
            person : $scope.gain.person,
            amount : $scope.gain.amount,
            date : $scope.gain.date,
            mode : $scope.gain.mode,
            subcategory : $scope.gain.subcategory,
            notes : $scope.gain.notes

        };
        mainService.sourcegain  = trans;
        mainService.addIncome();
        if(mainService.editflag == false){
            var postReq = mainService.postIncome();
            postReq.then(function(response){});
        }
        else{
 var putReq = mainService.putIncome(mainService.incomeArr[mainService.index].id);
            putReq.then(function(response){});
            
        }  
        $scope.income = mainService.incomeArr;
        $scope.money.income = mainService.getIncome();
        $scope.money.expense = mainService.getExpense();
        $scope.money.savings = $scope.money.income - $scope.money.expense;
        mainService.editflag = false;
        $scope.gain = {};
    };

    $scope.addExpense = function(){ 
        var trans = {
            person : $scope.spent.person,
            amount : $scope.spent.amount,
            date : $scope.spent.date,
            mode : $scope.spent.mode,
            subcategory : $scope.spent.subcategory,
            notes : $scope.spent.notes

        };
        mainService.transaction = trans;
        mainService.addExpense();
        if(mainService.editflag == false){
            var postReq = mainService.postExpense();
            postReq.then(function(response){});
        } 
         else{
 var putReq = mainService.putExpense(mainService.expenseArr[mainService.index].id);
            putReq.then(function(response){});
            
        } 
        $scope.expense = mainService.expenseArr;
        $scope.money.income = mainService.getIncome();
        $scope.money.expense = mainService.getExpense();
        $scope.money.savings = $scope.money.income - $scope.money.expense;
        mainService.editflag = false;
        $scope.spent = {};
    };
    $scope.show_expense = function(){
    	 if($scope.toggleVariable)
        {
            $scope.toggleVariable = false;
        } else{
            $scope.toggleVariable = true;
        }
        mainService.editflag = false;
    }
    $scope.removeIncome = function(name){              
        var index = -1;     
        var comArr = eval( $scope.income );
        for( var i = 0; i < comArr.length; i++ ) {
            if( comArr[i].id === name ) {
                index = i;
                break;
            }
        }
        if( index === -1 ) {
            alert( "Something gone wrong" );
        }
        var deleteReq = mainService.deleteIncome(name);
        deleteReq.then(function(response){});
        $scope.income.splice( index, 1 );
        mainService.incomeArr = $scope.income;
        $scope.money.income = mainService.getIncome();
        $scope.money.expense = mainService.getExpense();
        $scope.money.savings = $scope.money.income - $scope.money.expense;        
    };
    $scope.removeExpense = function(name){              
        var index = -1;     
        var comArr = eval( $scope.expense );
        for( var i = 0; i < comArr.length; i++ ) {
            if( comArr[i].id === name ) {
                index = i;
                break;
            }
        }
        if( index === -1 ) {
            alert( "Something gone wrong" );
        }
        var deleteReq = mainService.deleteExpense(name);
        deleteReq.then(function(response){});
        $scope.expense.splice( index, 1 ); 
        mainService.expenseArr = $scope.expense;
        $scope.money.income = mainService.getIncome();
        $scope.money.expense = mainService.getExpense();
        $scope.money.savings = $scope.money.income - $scope.money.expense;
    };
    $scope.editIncome = function(name){
         $scope.index = -1;     
        var comArr = eval( $scope.income );
        for( var i = 0; i < comArr.length; i++ ) {
            if( comArr[i].id === name ) {
                $scope.index = i;
                break;
            }
        }
        if( $scope.index === -1 ) {
            alert( "Something gone wrong" );
        }
        else{
            mainService.incomeArr[$scope.index].id = name;
            $scope.gain = $scope.income[$scope.index];
            mainService.index = $scope.index;
            mainService.editflag = true; 
        $scope.income = mainService.incomeArr;
 
        }
    };

    $scope.editExpense = function(name){
         $scope.index = -1;     
        var comArr = eval( $scope.expense );
        for( var i = 0; i < comArr.length; i++ ) {
            if( comArr[i].id === name ) {
                $scope.index = i;
                break;
            }
        }
        if( $scope.index === -1 ) {
            alert( "Something gone wrong" );
        }
        else{
            mainService.expenseArr[$scope.index].id = name;
            $scope.spent = $scope.expense[$scope.index];
            mainService.index = $scope.index;
            mainService.editflag = true;
        $scope.expense = mainService.expenseArr;
        }
    };
}]);