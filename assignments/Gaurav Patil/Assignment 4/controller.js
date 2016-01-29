var app = angular.module("expensesApp", []);

app.service('updateService', function(){
        this.index = '';
        this.income_array = [];
        this.income_temp = {
              category : '',
              value : ''
        };

        this.exp_array = [];
        this.exp_temp = {
              date : '',
              value : '',
              category : '',
              payee : ''
        };


        this.addIncome = function(){

                    if(this.index == undefined || this.index === ""){
                            this.income_array.push(this.income_temp); 
                    } else {
                            this.income_array[this.index] = this.income_temp;
                    }
                    this.index = "";
                    this.income_temp = {
                          category : '',
                          value : ''
                    };        
        };



        this.addExpense = function(){
               if(this.index === ""){
                    this.exp_array.push(this.exp_temp); 
               }else {
                this.exp_array[this.index] = this.exp_temp;
                }
        this.index = "";
        this.exp_temp = {
              date : '',
              value : '',
              category : '',
              payee : ''
        };

    };

        
//         this.editIncome = function(){

//                $scope.income.category = $scope.income_array[$scope.index].category;
//                $scope.income.value = $scope.income_array[$scope.index].value;
//         };

        this.deleteIncome = function(){
               this.income_array.splice(this.index,1);
        };

//         $scope.editExp = function(ind){
//                $scope.index = ind;
//                $scope.exp.date = $scope.exp_array[$scope.index].date;
//                $scope.exp.value = $scope.exp_array[$scope.index].value;     
//                $scope.exp.category = $scope.exp_array[$scope.index].category;     
//                $scope.exp.payee = $scope.exp_array[$scope.index].payee;
//         };

        this.deleteExpense = function(){
               this.exp_array.splice(this.index,1);
        };


//     $scope.index = "";
//     $scope.income_array = [];
//     $scope.exp_catogory = ["Rent","Travel","Party","Office","Others"];
//     $scope.income_category = ["Salary","Business","Interest","Others"];

//     $scope.total_income = function(){
//          var total_in = 0;  
//         for ( var i = 0, _len = $scope.income_array.length; i < _len; i++ ) {
//             total_in += $scope.income_array[i].value;
//         }
//     return total_in;
// }

//     $scope.exp_array = [];


//      $scope.total_exp = function(){
//          var total_ex = 0;  
//         for ( var i = 0, _len = $scope.exp_array.length; i < _len; i++ ) {
//             total_ex += $scope.exp_array[i].value;
//         }
//     return total_ex;
// };

//      $scope.total_bal = function(){
//          var total_balance = $scope.total_income() - $scope.total_exp();
//     return total_balance;
// };


});


app.controller("controller", function($scope,updateService) {
        $scope.index = "";
        updateService.index = $scope.index;

        $scope.income_category = ["Salary","Business","Interest","Others"];
        $scope.income_array = updateService.income_array;
        $scope.income_temp  = new Object();
        $scope.income_temp = {
              category : '',
              value : ''
        };

        $scope.exp_catogory = ["Rent","Travel","Party","Office","Others"];
        $scope.exp_array = updateService.exp_array;
        $scope.exp_temp  = new Object();
        $scope.exp_temp = {
                      date : '',
                      value : '',
                      category : '',
                      payee : ''
        };        

        $scope.addIncome = function(){
                updateService.income_temp = $scope.income_temp;
                updateService.addIncome();
                $scope.income_temp = {
                    category : '',
                    value : ''
                };   


                $scope.income_array = updateService.income_array;
        };

        $scope.editIncome = function(index) {
               $scope.index = index;
               updateService.index = $scope.index;
               $scope.income_temp = updateService.income_array[$scope.index]; 
        }

        $scope.deleteIncome = function(){
                updateService.deleteIncome();
                $scope.income_array = updateService.income_array;
        };

        $scope.addExpense = function(){
                updateService.exp_temp = $scope.exp_temp;
                updateService.addExpense();
                $scope.exp_temp = {
                      date : '',
                      value : '',
                      category : '',
                      payee : ''
        };

                $scope.exp_array = updateService.exp_array;
        };

        $scope.editExpense = function(index) {
               $scope.index = index;
               updateService.index = $scope.index;
               $scope.exp_temp = updateService.exp_array[$scope.index]; 
        };
        $scope.deleteExpense = function(){
                updateService.deleteExpense();
                $scope.exp_array = updateService.exp_array;
        };

}); 