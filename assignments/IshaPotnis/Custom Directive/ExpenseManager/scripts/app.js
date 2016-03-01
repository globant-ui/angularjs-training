angular.module("myapp",['ngRoute'])
.config(function($routeProvider){
  $routeProvider
    .when('/home',{
        templateUrl : 'views/home.html',
        controller  : 'mainController',
        resolve: {
                    expenseData : function(mainService){              
                      mainService.getIncomeData().then(function(resp) {
                      return 'hi';
                       });
                    }     
                  }
          })
          //route to report page
          .when('/report', {
                templateUrl : 'views/report.html',
                controller  : 'reportCtrl'
          })
           //route to about page
            .when('/settings', {
                templateUrl : 'views/settings.html',
                controller  : 'settingsCtrl'
            })
            .otherwise({
        redirectTo: '/home'
      });
});