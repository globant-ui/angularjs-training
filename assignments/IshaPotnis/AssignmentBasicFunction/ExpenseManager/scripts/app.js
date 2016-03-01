angular.module("myapp",['ngRoute'])
.config(function($routeProvider){
    $routeProvider
          //route to the income/expense page
          .when('/',{
                templateUrl : 'views/home.html',
                controller  : 'mainController',
              /*  resolve: {

                   expenseData : function(mainService){
                            var result = '';
                            mainService.getData().then(function(resp) {
                                return 'hi';
                            });

                   }
                   
                }*/
          })
          .when('/home',{
               templateUrl : 'views/home.html',
                controller  : 'mainController',
                /*resolve: {
                   expenseData : function(mainService){
                            
                            mainService.getData().then(function(resp) {
                                return 'hi';
                            });

                   }
                   
                }*/
          })
          //route to report page
          .when('/report', {
                templateUrl : 'views/report.html',
                controller  : 'mainController'
          })
           //route to about page
            .when('/about', {
                templateUrl : 'views/about.html',
                controller  : 'mainController'
            }); 

});


