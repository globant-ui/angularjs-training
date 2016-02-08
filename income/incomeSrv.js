/*incomeService - to get the data from json*/

expenseMngrApp.service("incomeService", function ($http, $q) {
    var deferred = $q.defer();

    $http.get("data/incomeData.json").then(function (data) {
        deferred.resolve(data);
    });
    this.getIncomeDetails = function () {
        return deferred.promise;
    }
});