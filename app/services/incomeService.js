myapp.service('IncomeListService', ['$http', '$q', '$rootScope', '$templateCache', function($http, $q, $rootScope, $templateCache){
    
    var targetUrl = 'https://demo4989304.mockable.io/incomeTransactions';

    var incomelist;
    
    this.getIncome = function() {
        incomelist = $http.get(targetUrl);
        return incomelist;
    },
    
    this.addIncome = function(item, id) {
        console.log(item);
        // console.log($rootScope.IncomeTransactions);
        // item[transactionId] = id;
        $rootScope.IncomeTransactions.push(item);
    }
  }]);