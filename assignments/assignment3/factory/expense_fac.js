angular.module('myApp').factory('expense', function() {

    return {
        showIncomeBox: function(param) {
            param.showIncome_Box = true;
            param.showExpend_Box = false;
            param.showEditIncome_Box = false;
            param.showEditExpense_Box = false;
            console.log("hi");
        },
        showExpendBox: function(param) {
            param.showIncome_Box = false;
            param.showExpend_Box = true;
            param.showEditIncome_Box = false;
            param.showEditExpense_Box = false;
        },
        addIncomeData: function(param) {
            param.incomedata.push({
                payer: param.payer,
                payee: param.payee,
                category: param.category,
                ModeofPayment: param.modeofpayment,
                Amount: param.amount,
                Notes: param.notes,
                Type: 'Income'
            });
            param.calcualateBalance();
        },
        addExpenseData: function(param) {
            param.expensedata.push({
                payer: param.payer,
                payee: param.payee,
                category: param.category,
                ModeofPayment: param.modeofpayment,
                Amount: param.amount,
                Notes: param.notes,
                Type: 'Expense'
            });
            param.calcualateBalance();
        },
        editRow: function(node, param, $scope) {
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
        },
        updateIncomeData: function($scope) {
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
        },
        updateExpenseData: function($scope) {
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
        }
    }

});
