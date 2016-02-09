var app = angular.module("myapp");
   app.controller('aboutCtrl',['$scope',function($scope){}]);
   app.controller('mainCtrl',['$scope','mainService',function($scope,mainService){
    $scope.income_money = mainService.getIncome();
    $scope.expense_money = mainService.getExpense();
    $scope.savings = $scope.income_money - $scope.expense_money; 
   }]);
   app.controller('reportCtrl',['$scope','mainService',function($scope,mainService){
        $scope.toggleVariable =true;
         $scope.show_income = function(){
        if($scope.toggleVariable)
        {
            $scope.toggleVariable = false;
        } else{
            $scope.toggleVariable = true;
        }
    }
    $scope.show_expense = function(){
         if($scope.toggleVariable)
        {
            $scope.toggleVariable = false;
        } else{
            $scope.toggleVariable = true;
        }
    }
    var fetchData = mainService.getData();
fetchData.then(function(response){
    $scope.income = response.data;
    mainService.incomeArr = $scope.income;
      mainService.expenseArr = [];
//    mainService.calculateOverall();
    $scope.income_money = mainService.getIncome();
    $scope.expense_money = mainService.getExpense();
    $scope.savings = $scope.income_money - $scope.expense_money;
    console.log($scope.income_money);
}); 
if(!$scope.$$phase) {
  $scope.$apply();
}
console.log($scope.income_money);
/*var postReq = mainService.postData();
postReq.then(function(response){
    console.log(response);
})*/
  
   }]);
   app.controller('mainController',['$scope', '$http','expenseData' ,'mainService',function($scope,$http, expenseData, mainService){
    console.log('data in controller ' + expenseData);
	$scope.index = -1;
    $scope.toggleVariable = true;
	$scope.income_money = 0;
	$scope.expense_money = 0;
	$scope.savings = 0;
    $scope.editflag = false;
    this.editflag = $scope.editflag;
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
var fetchData = mainService.getData();
fetchData.then(function(response){
    $scope.income = response.data;
    mainService.incomeArr = $scope.income;
    mainService.expenseArr = [];
    //    mainService.calculateOverall();
    $scope.income_money = mainService.getIncome();
    $scope.expense_money = mainService.getExpense();
    $scope.savings = $scope.income_money - $scope.expense_money;
if(!$scope.$$phase) {
  $scope.$apply();
}
console.log($scope.income_money);
}); 
console.log($scope.income_money);
/*var postReq = mainService.postData();
postReq.then(function(response){
    console.log(response);
})*/
    $scope.expense=[];
    mainService.expenseArr = $scope.expense;

    $scope.addIncome = function(){ 

        mainService.incomeType = $scope.incomeType;
        mainService.incomeAmount = $scope.incomeAmount;
        mainService.addIncome();
        $scope.income = mainService.incomeArr;
        //    mainService.calculateOverall();
    $scope.income_money = mainService.getIncome();
    $scope.expense_money = mainService.getExpense();
    $scope.savings = $scope.income_money - $scope.expense_money;
mainService.editflag = false;
        $scope.incomeAmount='';
        $scope.incomeType='';
if(!$scope.$$phase) {
  $scope.$apply();
}
console.log($scope.income_money);
    };

    $scope.addExpense = function(){ 
        
        mainService.expenseType = $scope.expenseType;
        mainService.expenseAmount = $scope.expenseAmount;
        mainService.mode = $scope.modes;
        mainService.expenseDate = $scope.expenseDate;
        mainService.payee = $scope.payee;
        mainService.addExpense();
        $scope.expense = mainService.expenseArr;
        //    mainService.calculateOverall();
    $scope.income_money = mainService.getIncome();
    $scope.expense_money = mainService.getExpense();
    $scope.savings = $scope.income_money - $scope.expense_money;
 if(!$scope.$$phase) {
  $scope.$apply();
}
        mainService.editflag = false;
        $scope.expenseType ='';
        $scope.expenseAmount = '';
        $scope.modes = '';
        $scope.expenseDate = '';
        $scope.payee = '';
    };
    
    $scope.show_income = function(){
        if($scope.toggleVariable)
        {
            $scope.toggleVariable = false;
        } else{
            $scope.toggleVariable = true;
        }
        mainService.editflag = false;
    }
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
            if( comArr[i].name === name ) {
                index = i;
                break;
            }
        }
        if( index === -1 ) {
            alert( "Something gone wrong" );
        }
        $scope.income.splice( index, 1 );
        mainService.incomeArr = $scope.income;
   //    mainService.calculateOverall();
    $scope.income_money = mainService.getIncome();
    $scope.expense_money = mainService.getExpense();
    $scope.savings = $scope.income_money - $scope.expense_money;
 console.log($scope.income_money);        
    };
    $scope.removeExpense = function(name){              
        var index = -1;     
        var comArr = eval( $scope.expense );
        for( var i = 0; i < comArr.length; i++ ) {
            if( comArr[i].name === name ) {
                index = i;
                break;
            }
        }
        if( index === -1 ) {
            alert( "Something gone wrong" );
        }
        $scope.expense.splice( index, 1 ); 
    mainService.expenseArr = $scope.expense;
    //    mainService.calculateOverall();
    $scope.income_money = mainService.getIncome();
    $scope.expense_money = mainService.getExpense();
    $scope.savings = $scope.income_money - $scope.expense_money;
if(!$scope.$$phase) {
  $scope.$apply();
}
    console.log($scope.income_money);      
    };
    $scope.editIncome = function(name){
         $scope.index = -1;     
        var comArr = eval( $scope.income );
        for( var i = 0; i < comArr.length; i++ ) {
            if( comArr[i].name === name ) {
                $scope.index = i;
                break;
            }
        }
        if( $scope.index === -1 ) {
            alert( "Something gone wrong" );
        }
        else{
            $scope.incomeAmount = $scope.income[$scope.index].value;
            $scope.incomeType = $scope.income[$scope.index].name;
            mainService.index = $scope.index;
            mainService.editflag = true; 
             mainService.addIncome();
        $scope.income = mainService.incomeArr;
           //    mainService.calculateOverall();
    $scope.income_money = mainService.getIncome();
    $scope.expense_money = mainService.getExpense();
    $scope.savings = $scope.income_money - $scope.expense_money;
        }
 if(!$scope.$$phase) {
  $scope.$apply();
}
        console.log($scope.income_money);
    };

    $scope.editExpense = function(name){
         $scope.index = -1;     
        var comArr = eval( $scope.expense );
        for( var i = 0; i < comArr.length; i++ ) {
            if( comArr[i].name === name ) {
                $scope.index = i;
                break;
            }
        }
        if( $scope.index === -1 ) {
            alert( "Something gone wrong" );
        }
        else{
            $scope.expenseType = $scope.expense[$scope.index].category;
            $scope.expenseAmount = $scope.expense[$scope.index].value;
            $scope.modes = $scope.expense[$scope.index].mode;
            $scope.expenseDate = $scope.expense[$scope.index].date;
            $scope.payee = $scope.expense[$scope.index].payee;
            mainService.index = $scope.index;
            mainService.editflag = true;
             mainService.addExpense();
        $scope.expense = mainService.expenseArr;
                 //    mainService.calculateOverall();
    $scope.income_money = mainService.getIncome();
    $scope.expense_money = mainService.getExpense();
    $scope.savings = $scope.income_money - $scope.expense_money;
        }
 if(!$scope.$$phase) {
  $scope.$apply();
}
        console.log($scope.income_money);
    };
}]);