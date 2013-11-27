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
                controller: 'ApplicationController',
                resolve: {
                    isConnected: ['$location', 'socket', 'auth',
                    function isConnected($location, socket, auth) {

                        auth.getUser().then(function() {
                            socket.emit('data/all/request');
                        }).catch(function() {
                            $location.path('/');
                        });

                    }]
                }
            }).
            otherwise({
                redirectTo: '/'
            });

    }]);

})(window);