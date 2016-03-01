angular.module("myapp",['ngRoute'])
.config(function($routeProvider){
    $routeProvider
          .when('/home',{
               templateUrl : 'views/home.html',
                controller  : 'mainController',
                resolve: {
                   expenseData : function(mainService){
                            
                            mainService.getData().then(function(resp) {
                                return 'hi';
                            });


                   }

                   /*                   expenseData : ['$q','mainService', function($q, mainService){
                            var dfr = $q.defer();
                            mainService.getData().then(function(resp) {
                                dfr.resolve('hi');
                            });
                            function success(){
                                console.log("Hi people....");
                            };
                            return dfr.promise;

                   }]
  */             
                   
                }
          })
          //route to report page
          .when('/report', {
                templateUrl : 'views/report.html',
                controller  : 'reportCtrl'
          })
           //route to about page
            .when('/about', {
                templateUrl : 'views/about.html',
                controller  : 'aboutCtrl'
            })
            .otherwise({
        redirectTo: '/home'
      });


});


