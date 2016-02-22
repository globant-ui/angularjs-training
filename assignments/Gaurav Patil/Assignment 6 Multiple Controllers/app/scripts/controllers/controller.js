var app = angular.module("expensesApp");
	app.controller("controller", function($rootScope, $scope, updateService) {
    $scope.index = "";
    updateService.index = $scope.index;

    $scope.income_category = ["Salary", "Business", "Interest", "Others"];
    $scope.income_mode = ['Credit Card','Cash','Electronic Transfer'];
    $scope.income_array = updateService.income_array;
    $scope.income_temp = new Object();
    $scope.income_temp = {
        category: '',
        value: '',
        date: '',
        mode: ''
    };

    $scope.exp_catogory = ["Rent", "Travel", "Party", "Office", "Others"];
    $scope.exp_array = updateService.exp_array;
    $scope.exp_temp = new Object();
    $scope.exp_temp = {
        date: '',
        value: '',
        category: '',
        payee: ''
    };

    $scope.addIncome = function() {
        updateService.income_temp = $scope.income_temp;
        updateService.addIncome();
        $scope.income_temp = {
            category: '',
            value: '',
            category: '',
            mode: ''
        };


        $scope.income_array = updateService.income_array;
    };

    $scope.editIncome = function(index) {
        $scope.index = index;
        updateService.index = $scope.index;
        $scope.income_temp = updateService.income_array[$scope.index];
    }

    $scope.deleteIncome = function() {
        updateService.deleteIncome();
        $scope.income_array = updateService.income_array;
    };

    $scope.addExpense = function() {
        updateService.exp_temp = $scope.exp_temp;
        updateService.addExpense();
        $scope.exp_temp = {
            date: '',
            value: '',
            category: '',
            payee: ''
        };

        $scope.exp_array = updateService.exp_array;
    };

    $scope.editExpense = function(index) {
        $scope.index = index;
        updateService.index = $scope.index;
        $scope.exp_temp = updateService.exp_array[$scope.index];
    };
    $scope.deleteExpense = function() {
        updateService.deleteExpense();
        $scope.exp_array = updateService.exp_array;
    };

        $scope.total_income = function(){
             var total_in = 0;  
            for ( var i = 0, _len = $scope.income_array.length; i < _len; i++ ) {
                total_in += $scope.income_array[i].value;
            }
        return total_in;
    }
          $scope.total_exp = function(){
             var total_ex = 0;  
            for ( var i = 0, _len = $scope.exp_array.length; i < _len; i++ ) {
                total_ex += $scope.exp_array[i].value;
            }
        return total_ex;
    };

         $scope.total_bal = function(){
             var total_balance = $scope.total_income() - $scope.total_exp();
        return total_balance;
    };

     $scope.$on('incomeDetails',function(event){
            $scope.income_temp = {
                category : updateService.income_temp.category,
                value : updateService.income_temp.value,
                date : updateService.income_temp.date,
                mode : updateService.income_temp.mode
            };
     });

     $scope.$on('expenseDetails',function(event){

            $scope.exp_temp = {
                date: updateService.exp_temp.date,
                value: updateService.exp_temp.value,
                category: updateService.exp_temp.category,
                payee: updateService.exp_temp.payee
            };
     });
     $scope.in = true;
     $scope.ex = false;


     $scope.displayIncome = function(){
        if(this.in == true){
            this.in = false;
            this.ex = true;
        }else{
            this.in = true;
            this.ex = false;
        }
        return this.in;
     };

     $scope.displayExpense = function(){
        if(this.ex == true){
            this.in = true;
            this.ex = false;
        }else{
            this.in = false;
            this.ex = true;
        }
        return this.ex;
     };

});