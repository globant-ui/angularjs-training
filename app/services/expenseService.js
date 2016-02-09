myapp.service('ExpenseListService', ['$http', '$q', '$rootScope', '$templateCache', function($http, $q, $rootScope, $templateCache){
    
    var targetUrl = 'https://demo4989304.mockable.io/expenseTransactions';

    var expenselist;
    
    this.getExpense = function() {
        expenselist = $http.get(targetUrl);
        return expenselist;
    },
    
    this.addExpense = function(item) {
        // console.log("add expense");
        // console.log($rootScope.ExpenseTransactions);
        $rootScope.ExpenseTransactions.push(item);
    }
    
  }]);