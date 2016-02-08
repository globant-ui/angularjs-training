/*expense service - to fetch the data from json*/
expenseMngrApp.service("expenseService" , function ($http , $q) {
    var deferred = $q.defer();
    $http.get("data/expenseData.json").then(function (data) {
        deferred.resolve(data);
    });
    
    this.getExpenseDetails = function () {
        return deferred.promise;
    }
})


