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
            controller: function($scope) {

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
                    $scope.showIncome_Box = true;
                    $scope.showExpend_Box = false;
                    $scope.showEditIncome_Box = false;
                    $scope.showEditExpense_Box = false;
                }
                $scope.showExpendBox = function() {
                    $scope.showIncome_Box = false;
                    $scope.showExpend_Box = true;
                    $scope.showEditIncome_Box = false;
                    $scope.showEditExpense_Box = false;
                }
                $scope.addIncomeData = function() {
                    alert("hii");

                    $scope.incomedata.push({
                        payer: $scope.payer,
                        payee: $scope.payee,
                        category: $scope.category,
                        ModeofPayment: $scope.modeofpayment,
                        Amount: $scope.amount,
                        Notes: $scope.notes,
                        Type: 'Income'
                    });
                    $scope.calcualateBalance();
                };
                $scope.addExpenseData = function() {
                    alert("exp");

                    $scope.expensedata.push({
                        payer: $scope.payer,
                        payee: $scope.payee,
                        category: $scope.category,
                        ModeofPayment: $scope.modeofpayment,
                        Amount: $scope.amount,
                        Notes: $scope.notes,
                        Type: 'Expense'
                    });
                    $scope.calcualateBalance();
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
                    if (node.Type == "Income") {

                        $scope.showEditIncome_Box = true;
                        $scope.showIncome_Box = false;
                        $scope.showEditExpense_Box = false;
                        $scope.showExpend_Box = false;

                        $scope.editLocation = param;

                        $scope.incpayer = $scope.incomedata[param].payer;
                        $scope.incpayee = $scope.incomedata[param].payee;
                        $scope.inccategory = $scope.incomedata[param].category;
                        $scope.incmodeofpayment = $scope.incomedata[param].ModeofPayment;
                        $scope.incAmount = $scope.incomedata[param].Amount;
                        $scope.incnotes = $scope.incomedata[param].Notes;

                    } else if (node.Type == "Expense") {
                        alert("1");
                        $scope.showEditIncome_Box = false;
                        $scope.showIncome_Box = false;
                        $scope.showEditExpense_Box = true;
                        $scope.showExpend_Box = false;

                        $scope.editLocation = param;

                        $scope.exppayer = $scope.expensedata[param].payer;
                        $scope.exppayee = $scope.expensedata[param].payee;
                        $scope.expcategory = $scope.expensedata[param].category;
                        $scope.expmodeofpayment = $scope.expensedata[param].ModeofPayment;
                        $scope.expAmount = $scope.expensedata[param].Amount;
                        $scope.expnotes = $scope.expensedata[param].Notes;
                    }
                    $scope.calcualateBalance();
                };
                $scope.updateIncomeData = function() {

                    $scope.incomedata[$scope.editLocation].payer = $scope.incpayer;
                    $scope.incomedata[$scope.editLocation].payee = $scope.incpayee;
                    $scope.incomedata[$scope.editLocation].category = $scope.inccategory;
                    $scope.incomedata[$scope.editLocation].modeofpayment = $scope.incmodeofpayment;
                    $scope.incomedata[$scope.editLocation].Amount = $scope.incAmount;
                    $scope.incomedata[$scope.editLocation].Notes = $scope.incnotes;

                    $scope.incpayer = "";
                    $scope.incpayee = "";
                    $scope.inccategory = "";
                    $scope.incmodeofpayment = "";
                    $scope.incAmount = "";
                    $scope.incnotes = "";

                    $scope.showEditIncome_Box = true;
                    $scope.showIncome_Box = false;
                    $scope.showEditExpense_Box = false;
                    $scope.showExpend_Box = false;

                    $scope.calcualateBalance();
                };
                $scope.updateExpenseData = function() {
                    alert("uuu");
                    $scope.expensedata[$scope.editLocation].payer = $scope.exppayer;
                    $scope.expensedata[$scope.editLocation].payee = $scope.exppayee;
                    $scope.expensedata[$scope.editLocation].category = $scope.expcategory;
                    $scope.expensedata[$scope.editLocation].modeofpayment = $scope.expmodeofpayment;
                    $scope.expensedata[$scope.editLocation].Amount = $scope.expAmount;
                    $scope.expensedata[$scope.editLocation].Notes = $scope.expnotes;

                    $scope.exppayer = "";
                    $scope.exppayee = "";
                    $scope.expcategory = "";
                    $scope.expmodeofpayment = "";
                    $scope.expAmount = "";
                    $scope.expnotes = "";

                    $scope.showEditIncome_Box = false;
                    $scope.showIncome_Box = false;
                    $scope.showEditExpense_Box = true;
                    $scope.showExpend_Box = false;

                    $scope.calcualateBalance();
                };


            }
        });


});

app.controller('customersCtrl', function($scope, $http) {

});
