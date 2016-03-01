var app = angular.module("expensesApp", []);

app.controller("controller", function($scope) {

    $scope.index = "";
    $scope.income_array = [];
    $scope.exp_category = ["Rent","Travel","Party","Office","Others"];
    $scope.income_category = ["Salary","Business","Interest","Others"];
    $scope.income_mode = ['Credit Card','Cash','Electronic Transfer'];

    $scope.total_income = function(){
         var total_in = 0;  
        for ( var i = 0, _len = $scope.income_array.length; i < _len; i++ ) {
            total_in += $scope.income_array[i].value;
        }
    return total_in;
}

    $scope.exp_array = [];

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
$scope.addIncome = function(){
        if($scope.index === ""){
            var newItem ={};
            newItem.category= $scope.income.category;
            newItem.value=$scope.income.value;
            newItem.date = $scope.income.date;
            newItem.mode = $scope.income.mode;
            $scope.income_array.push(newItem); 
    } else {
            var newItem ={};
            newItem.category= $scope.income.category;
            newItem.value=$scope.income.value;
            newItem.date = $scope.income.date;
            newItem.mode = $scope.income.mode;
            $scope.income_array[$scope.index] = newItem;
    }
    $scope.index = "";
    $scope.income.value = "";
    $scope.income.date= "";
    $scope.income.mode = "";
    $scope.income.category = "";
};

$scope.addExpense = function(){
               if($scope.index === ""){
            var newItem ={};
            newItem.date= $scope.exp.date;
            newItem.value=$scope.exp.value;
            newItem.category = $scope.exp.category;
            newItem.payee = $scope.exp.payee;
            $scope.exp_array.push(newItem); 
    } else {
            var newItem ={};
            newItem.date= $scope.exp.date;
            newItem.value=$scope.exp.value;
            newItem.category = $scope.exp.category;
            newItem.payee = $scope.exp.payee;
            $scope.exp_array[$scope.index] = newItem;
    }
    $scope.index = "";
    $scope.exp.date = "";
    $scope.exp.value = "";
    $scope.exp.category = "";
    $scope.exp.payee = "";

};

$scope.editIncome = function(ind){
       $scope.index = ind;
       $scope.income.category = $scope.income_array[$scope.index].category;
       $scope.income.value = $scope.income_array[$scope.index].value;
       $scope.income.date = $scope.income_array[$scope.index].date;
       $scope.income.mode = $scope.income_array[$scope.index].mode;
};

$scope.deleteIncome = function(ind){
       $scope.income_array.splice(ind,1);
};

$scope.editExp = function(ind){
       $scope.index = ind;
       $scope.exp.date = $scope.exp_array[$scope.index].date;
       $scope.exp.value = $scope.exp_array[$scope.index].value;     
       $scope.exp.category = $scope.exp_array[$scope.index].category;     
       $scope.exp.payee = $scope.exp_array[$scope.index].payee;
};

$scope.deleteExp = function(ind){
       $scope.exp_array.splice(ind,1);
};
    
});