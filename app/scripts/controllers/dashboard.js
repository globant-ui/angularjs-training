angular.module('myAppApp')
.controller('DashboardCtrl', function ($scope, incomeService, expenseService) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
    $scope.showModal = false;
    $scope.totalIncome = 0;
    $scope.totalExpense = 0;
    $scope.totalBalance = $scope.totalIncome + $scope.totalExpense;
    
    var IncomeData;
    var ExpenseData;
    
    IncomeData = incomeService.postData(null);
    ExpenseData =  expenseService.postData(null);
    
    $scope.toggleModal = function(){
        $scope.showModal = !$scope.showModal;
    }
    
    $scope.calculateIncome = function(){
        // console.log("sdsd");
        IncomeData.forEach(function(element) {
            $scope.totalIncome = $scope.totalIncome + parseInt(element.amount);
        }, this);
    }
    
    $scope.calculateExpense = function(){
        ExpenseData.forEach(function(element) {
            $scope.totalExpense = $scope.totalExpense + parseInt(element.amount);
        }, this);
    }
    
    $scope.calculateBalance = function(){
        $scope.totalBalance = $scope.totalIncome - $scope.totalExpense;
    }
    
    $scope.calculateIncome();
    $scope.calculateExpense();
    $scope.calculateBalance();
    
  });