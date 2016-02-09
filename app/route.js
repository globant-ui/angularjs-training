myapp.config(function($rootProvider) {
       $rootProvider
        .when('/',{
            templateUrl: 'views/index.html',
            controller: 'mainctrl'
        })
        .when('/expense',{
            templateUrl: 'views/viewExpense.html',
            controller: 'mainctrl'
        })
    });