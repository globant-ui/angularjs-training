var app = angular.module("expensesApp");
	app.controller("controller", function($rootScope, $scope, updateService,$http,RecurringService) {
    $scope.index = "";
     $scope.in = true;
     $scope.ex = false;
     $scope.recur = false;
     $scope.sum = false;
    updateService.index = $scope.index;

    $scope.income_category = ["Salary", "Business", "Interest", "Others"];
    $scope.income_mode = ['Credit Card','Cash','Electronic Transfer'];
    $scope.recurring_category = ['Income','Expense'];
    $scope.recurring_interval = ['Monthly','Yearly'];
    $scope.summary_array = RecurringService.recurring_array;
    $scope.income_array = updateService.income_array;
    $scope.income_temp = new Object();
    $scope.income_temp = {
        category: '',
        value: '',
        date: '',
        mode: '',
        message: ''
    };

    $scope.exp_catogory = ["Rent", "Travel", "Party", "Office", "Others"];
    $scope.exp_array = updateService.exp_array;
    $scope.exp_temp = new Object();
    $scope.exp_temp = {
        date: '',
        value: '',
        category: '',
        payee: '',
        message:''
    };

    $scope.recur_temp = new Object();
    $scope.recur_temp = {
        category : '',
        amount : '',
        date: '',
        type : ''
    }; 


    $scope.addIncome = function() {
        updateService.income_temp = $scope.income_temp;
        updateService.addIncome();
        $scope.income_temp = {
            category: '',
            value: '',
            category: '',
            mode: '',
            message:''
        };


        $scope.income_array = updateService.income_array;
    };

    $scope.addExpense = function() {
        updateService.exp_temp = $scope.exp_temp;
        updateService.addExpense();
        $scope.exp_temp = {
            date: '',
            value: '',
            category: '',
            payee: '',
            message:''
        };

        $scope.exp_array = updateService.exp_array;
    };

    $scope.addRecurringTransaction = function() {
        RecurringService.recur_temp = $scope.recur_temp;
        RecurringService.addRecurringTransaction();
            $scope.recur_temp = {
                category : '',
                amount : '',
                date: '',
                type : ''
            };  

        $scope.summary_array = RecurringService.recurring_array;
    };


    $scope.total_income = function(){
         var total_in = 0;  
        for ( var i = 0, _len = $scope.income_array.length; i < _len; i++ ) {
            total_in += parseInt($scope.income_array[i].value);
        }
        return total_in;
    }
      $scope.total_exp = function(){
         var total_ex = 0;  
        for ( var i = 0, _len = $scope.exp_array.length; i < _len; i++ ) {
            total_ex += parseInt($scope.exp_array[i].value);
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
                mode : updateService.income_temp.mode,
                message:updateService.income_temp.message
            };
     });

     $scope.$on('expenseDetails',function(event){

            $scope.exp_temp = {
                date: updateService.exp_temp.date,
                value: updateService.exp_temp.value,
                category: updateService.exp_temp.category,
                payee: updateService.exp_temp.payee,
                message: updateService.exp_temp.message
            };
     });

     $scope.displayIncome = function(){
        $http({
            method: 'GET',
            url: 'http://demo1941123.mockable.io/income'
        }).then(function successCallback(response) {
            var message = response.data.message;
            alert(message);
        }, function errorCallback(response) {
            console.log("error");
       });

            this.recur = false;
            this.in = false;
            this.ex = true;
            this.sum = false;

        return this.in;
     };

     $scope.displayExpense = function(){
        $http({
            method: 'GET',
            url: 'http://demo1941123.mockable.io/expense'
        }).then(function successCallback(response) {
            var message = response.data.message;
            alert(message);
        }, function errorCallback(response) {
            console.log("error");
       });

            this.ex = true;
            this.in = false;
            this.recur = false;
            this.sum = false;

        return this.ex;
     };

     $scope.displayRecurring = function(){
            this.recur = true;
            this.in = false;
            this.ex = false;
            this.sum = false;
        
        return this.recur;
     }

     $scope.displaySummary = function(){
        this.sum = true;
            this.in = false;
            this.ex = false;
            this.recur = false;
        
        return this.sum;
     }

});