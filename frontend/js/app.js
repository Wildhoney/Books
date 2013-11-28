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
                templateUrl: 'views/main.html',
                resolve: {
                    isConnected: ['$location', '$rootScope', '$timeout', 'socket', 'auth',
                    function isConnected($location, $rootScope, $timeout, socket, auth) {

                        auth.getUser().then(function(data) {
                            socket.emit('data/all/request');
                        }).catch(function() {

                            $timeout(function() {
                                $rootScope.$broadcast('facebook/status/denied');
                            }, 1000);

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