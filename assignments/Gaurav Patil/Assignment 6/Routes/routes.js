app.config(function ($routeProvider) {
    $routeProvider.
    when('/home', {
        templateUrl: 'home.html',
        controller: 'controller'
    }).
    when('/income', {
        templateUrl: 'income.html',
        controller: 'controller'
    }).
    when('/expense', {
        templateUrl: 'expense.html',
        controller: 'controller'
    }).
    otherwise({
        redirectTo: '/home'
    });
});