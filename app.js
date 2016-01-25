var app = angular.module('myApp', ['ui.router', 'ngAnimate']);


app.config(function($stateProvider, $urlRouterProvider) {


  //  $urlRouterProvider.otherwise('/home');

    $stateProvider

    // HOME STATES AND NESTED VIEWS ========================================
       
        .state('home', {
            url: '/home',
            templateUrl: 'pages/home.html',
            controller: function($scope) {

                $scope.showIncome = true;
                $scope.showExpense = false;
                $scope.totalInome = 0;

                $scope.incomeArray = [{
                    business: 1000,
                    company: 2500,
                    market: 4000,
                    sharemarket: 6000
                }];
                $scope.expenseArray = [{
                    shopping: 500,
                    fees: 200,
                    mobilebill: 300,
                    petrolbill: 500

                }];

                $scope.showExpensedata = function() {
                    $scope.showIncome = false;
                    $scope.showExpense = true;
                };

                $scope.showIncomedata = function() {
                    $scope.showIncome = true;
                    $scope.showExpense = false;
                };

                $scope.sumOfExpense = 0;
                for (var a in $scope.expenseArray[0]) {
                    $scope.sumOfExpense += $scope.expenseArray[0][a];
                    console.log('add   ' +$scope.expenseArray[0][a]);
                }


                $scope.sumOfIncome = 0;
                for (var a in $scope.incomeArray[0]) {
                    $scope.sumOfIncome += $scope.incomeArray[0][a];
                    console.log($scope.incomeArray[0][a]);
                }



            }
        })



});

app.controller('customersCtrl', function($scope) {

});
