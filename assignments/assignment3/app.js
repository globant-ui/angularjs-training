var app = angular.module('myApp', ['ui.router', 'ngAnimate']);


app.config(function($stateProvider, $urlRouterProvider) {


    $urlRouterProvider.otherwise('/home');

    $stateProvider


        .state('home', {
            url: '/home',
            templateUrl: 'pages/home.html'
        })
        .state('about', {
            url: '/about',
            templateUrl: 'pages/about.html',
            controller: function($scope, expense) {

                $scope.editLocation = null;
                $scope.editValll = "";


                $scope.incomedata = [{
                    payer: 'Mugdha',
                    payee: 'sayali',
                    category: 'Business',
                    ModeofPayment: 'Bank',
                    Amount: 2000,
                    Notes: 'Added amount',
                    Type: 'Income'
                }, {
                    payer: 'Rishi',
                    payee: 'Vidya',
                    category: 'Share Market',
                    ModeofPayment: 'Cash',
                    Amount: 300,
                    Notes: 'Added Cash',
                    Type: 'Income'
                }];

                $scope.expensedata = [{
                    payer: 'Purva',
                    payee: 'Anil',
                    category: 'Business',
                    ModeofPayment: 'Bank',
                    Amount: 5000,
                    Notes: 'Added amount',
                    Type: 'Expense'

                }, {
                    payer: 'prachi',
                    payee: 'Anuj',
                    category: 'Share Market',
                    ModeofPayment: 'Cash',
                    Amount: 400,
                    Notes: 'Added Cash',
                    Type: 'Expense'

                }];



                $scope.incometable = true;
                $scope.expensetable = true;
                $scope.showIncome_Box = false;
                $scope.showExpend_Box = false;
                $scope.showEditIncome_Box = false;
                $scope.showEditExpense_Box = false;

                $scope.showIncomeBox = function() {
                    expense.showIncomeBox($scope);
                }
                $scope.showExpendBox = function() {
                    expense.showExpendBox($scope);
                }
                $scope.addIncomeData = function() {

                    expense.addIncomeData($scope);
                };
                $scope.addExpenseData = function() {
                    expense.addExpenseData($scope);
                };
                $scope.calcualateBalance = function() {
                    $scope.totalincome = 0;
                    $scope.totalexpense = 0;

                    for (var i = 0; i < $scope.incomedata.length; i++) {
                        $scope.totalincome += parseInt($scope.incomedata[i].Amount);

                    }
                    for (var i = 0; i < $scope.expensedata.length; i++) {
                        $scope.totalexpense += parseInt($scope.expensedata[i].Amount);
                    }
                }
                $scope.calcualateBalance();

                $scope.removeRow = function(node, param) {
                    if (node.Type == "Income") {
                        $scope.incomedata.splice(param, 1);
                    } else if (node.Type == "Expense") {
                        $scope.expensedata.splice(param, 1);
                    }
                    $scope.calcualateBalance();
                };
                $scope.editRow = function(node, param) {
                      expense.editRow(node, param,$scope);
                };
                $scope.updateIncomeData = function() {
                        expense.updateIncomeData($scope);                   
                };
                $scope.updateExpenseData = function() {
                  expense.updateExpenseData($scope); 
                };


            }
        });


});

app.controller('customersCtrl', function($scope, $http, expense) {

});
