'use strict';

app.service('incomeService',function( $http,$q ){
     


     var deferred = $q.defer();
      
         $http.get("Scripts/JSON/incomedata.json").then(function (data) {
        deferred.resolve(data);
    });
          
        this.getIncomeDetails = function () {
           return deferred.promise;
      };  
      
});