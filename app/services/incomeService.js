myapp.service('IncomeListService', ['$http', '$q', '$rootScope', '$templateCache', function($http, $q, $rootScope, $templateCache){
    
    var targetUrl = 'https://demo4989304.mockable.io/incomeTransactions';

    var incomelist;
    this.getIncome = function() {
      incomelist = $http.get(targetUrl);
    //   console.log("#data received: " + JSON.stringify(incomelist));

      console.log(JSON.stringify(incomelist));
      return incomelist;
    };
  }]);