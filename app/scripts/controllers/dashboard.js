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
    
    $scope.IncomeData;
    $scope.ExpenseData;
    
    $scope.IncomeData = incomeService.postData(null);
    $scope.ExpenseData =  expenseService.postData(null);
    
    $scope.toggleModal = function(){
        $scope.showModal = !$scope.showModal;
    }
    
    $scope.calculateIncome = function(){
        // console.log("sdsd");
        $scope.IncomeData.forEach(function(element) {
            $scope.totalIncome = $scope.totalIncome + parseInt(element.amount);
        }, this);
    }
    
    $scope.calculateExpense = function(){
        $scope.ExpenseData.forEach(function(element) {
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