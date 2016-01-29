'use strict';

app.service('expneseMgtService',function( $http,$q ){
    var mgtData = {};
     var api = {};
    api.saveData = function( data ){
      mgtData = data;
      return data;
    }
    api.getData = function(){
       /*$http({
              method: 'GET',
              url: 'mock_api/expensedata.json'
          }).success(function (data) {
            console.log(data);
            mgtData = data;
          }).error(function (msg) {
            console.log(msg);
          });*/

           $http.get('mock_api/expensedata.json').success(function(data){
            console.log(data);
             mgtData = data;
           });
       return mgtData;
     }

    return api;
});