var app=angular.module("myapp",[]);
app.service('mainService', function(){
    this.editflag = false;
    this.income = [];
    this.index = -1;
    this.incomeType = "";
    this.incomeAmount = "";
    this.income_money = "";
    this.savings = "";
    this.expense_money = "";
    this.addIncome = function(){ 
    if(this.editflag == true){
          this.income[this.index].name = this.incomeType;
          this.income[this.index].value = this.incomeAmount;
    }else{
         this.income.push({ 'name':this.incomeType, 'value': this.incomeAmount});
    }
    this.income_money = this.income_money +  this.incomeAmount;
    this.savings = this.income_money - this.expense_money;
    }
});

app.controller('main',  function($scope,mainService){
	$scope.index = -1;
    $scope.income1 = false;
	$scope.expense1 = false;
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
    $scope.income=[{
    	name:'Salary', value: 35000
    },{
    	name:'Business', value: 10000
    },{
    	name:'Interest on deposit', value: 1000
    },{
    	name:'Miscellaneous', value: 7000
    }];
    mainService.income = $scope.income;
    angular.forEach($scope.income, function(incomes){
    	$scope.income_money = $scope.income_money + incomes.value;
    });
    mainService.income_money = $scope.income_money;
   
    $scope.expense=[];
    angular.forEach($scope.expense, function(expenses){
    	$scope.expense_money = $scope.expense_money + expenses.value;
    });
     mainService.expense_money = $scope.expense_money;
      mainService.savings = $scope.savings;

    $scope.people = [{
        name: "Income"
    }, {
        name: "Expenses"
    }];

    $scope.addIncome = function(){ 

        mainService.incomeType = $scope.incomeType;
        mainService.incomeAmount = $scope.incomeAmount;
        mainService.addIncome();
        $scope.editflag = false;
        $scope.incomeAmount='';
        $scope.incomeType='';
        $scope.income_money = mainService.income_money;
        $scope.savings = mainService.savings;

    };
    
$scope.addExpense = function(){
if($scope.editflag == true){
          $scope.editflag = false;
          $scope.expense[$scope.index].category = $scope.expenseType;
          $scope.expense[$scope.index].value = $scope.expenseAmount;
          $scope.expense[$scope.index].mode = $scope.modes;
          $scope.expense[$scope.index].date = $scope.expenseDate;
          $scope.expense[$scope.index].payee = $scope.payee;
    }else{     
    $scope.expense.push({ 'category':$scope.expenseType, 'value': $scope.expenseAmount, 'mode':$scope.modes , 'date':$scope.expenseDate , 'payee':$scope.payee });
}
$scope.expense_money = $scope.expense_money + $scope.expenseAmount;
    $scope.savings = $scope.income_money - $scope.expense_money;
    $scope.expenseType ='';
    $scope.expenseAmount = '';
    $scope.modes = '';
    $scope.expenseDate = '';
    $scope.payee = '';
};

    $scope.show_income = function(){
    	$scope.income1 = true;
    	$scope.expense1 = false;

    }
    $scope.show_expense = function(){
    	$scope.income1 = false;
    	$scope.expense1 = true;
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
    };
    $scope.editRow1 = function(name){
        alert("hi");
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
            $scope.editflag = true; 
        }
    };

    $scope.editRow2 = function(name){
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
            alert($scope.expense[$scope.index].date + $scope.expenseDate);
          $scope.payee = $scope.expense[$scope.index].payee;
            $scope.editflag = true; 
        }
    };

    $scope.savings = $scope.income_money - $scope.expense_money;
});

