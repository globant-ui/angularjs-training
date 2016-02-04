myapp.service('ExpenseListService', ['$http', '$q', '$rootScope', '$templateCache', function($http, $q, $rootScope, $templateCache){
    
    var targetUrl = 'https://demo4989304.mockable.io/expenseTransactions';

    var expenselist;
    this.getExpense = function() {
      expenselist = $http.get(targetUrl);
    //   console.log("#data received: " + JSON.stringify(expenselist));

    //   console.log(JSON.stringify(expenselist));
      return expenselist;
    };
  }]);