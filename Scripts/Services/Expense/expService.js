'use strict';

app.service('expenseService',function( $http,$q ){
     


     var deferred = $q.defer();
      
         $http.get("Scripts/JSON/expensedata.json").then(function (data) {
        deferred.resolve(data);
    });
          
        this.getExpenseDetails = function () {
           return deferred.promise;
      };  
      
});