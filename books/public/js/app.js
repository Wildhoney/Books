(function($window) {

    // Bootstrap our book application!
    $window.bookApp = $window.angular.module('bookApp', ['ngRoute']);

    $window.bookApp.config(['$routeProvider', function($routeProvider) {

        $routeProvider.
            when('/', {
                templateUrl: 'views/facebook.html',
                controller: 'FacebookController'
            }).
            when('/begin', {
                templateUrl: 'views/application.html',
                controller: 'ApplicationController'
            }).
            otherwise({
                redirectTo: '/'
            });

    }]);

})(window);