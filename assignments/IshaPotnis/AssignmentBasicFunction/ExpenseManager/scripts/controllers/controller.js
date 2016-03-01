angular.module("myapp")
   .controller('mainController',['$scope', '$http',/*'expenseData' ,*/ 'mainService',function($scope,$http,/* expenseData,*/ mainService){
    //console.log('data in controller ' + expenseData);
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
    $http.get('http://localhost:8080/scripts/data.json').success(function(response){
                $scope.income = response;
                //console.log(JSON.stringify(response));
               //  defer.resolve(response);
            })

   //$scope.income = data;
   alert($scope.income);
    var data1 = $.param({
            json: JSON.stringify({"name":"Business","value":5055})
        });
   //$http.post('http://localhost:8080/ExpenseManager/scripts/data.json' , data1).success(function(response){
   //     alert("In success!!" + response);
        // $scope.income=response;
   // }).error(function(response){
   //     alert("hi" + response);
   // });
   
    $scope.expense=[];
    $scope.calculateOverall = function(){
        $scope.income_money = 0;
        $scope.expense_money = 0;
        $scope.savings = 0;
        angular.forEach($scope.expense, function(expenses){
            $scope.expense_money = $scope.expense_money + expenses.value;
        }); 
        angular.forEach($scope.income, function(incomes){
            $scope.income_money = $scope.income_money + incomes.value;
            alert($scope.income_money);
        });
        alert("hi"+$scope.income_money);
        $scope.savings = $scope.income_money - $scope.expense_money;
     }


     alert("hi"+$scope.income_money);
    $scope.calculateOverall();
    alert("bye"+$scope.income_money);
    
    mainService.income = $scope.income;
   
    mainService.expense = $scope.expense;

    $scope.people = [{
        name: "Income"
    }, {
        name: "Expenses"
    }];

    $scope.addIncome = function(){ 

        mainService.incomeType = $scope.incomeType;
        mainService.incomeAmount = $scope.incomeAmount;
        mainService.addIncome();
        $scope.income = mainService.income;
        $scope.calculateOverall();
        mainService.editflag = false;
        $scope.incomeAmount='';
        $scope.incomeType='';

    };

    $scope.addExpense = function(){ 
        
        mainService.expenseType = $scope.expenseType;
        mainService.expenseAmount = $scope.expenseAmount;
        mainService.mode = $scope.modes;
        mainService.expenseDate = $scope.expenseDate;
        mainService.payee = $scope.payee;
        mainService.addExpense();
        $scope.expense = mainService.expense;
        $scope.calculateOverall();
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
        $scope.calculateOverall();        
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
        $scope.calculateOverall();       
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
        }
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
        }
    };
}]);