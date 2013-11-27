(function($bookApp) {

    /**
     * @factory data
     */
    $bookApp.factory('data', ['$rootScope', 'socket', function($rootScope, socket) {

        var factory = {};

        /**
         * @property users
         * @type {Array}
         */
        factory.users = [];

        /**
         * @property books
         * @type {Array}
         */
        factory.books = [];

        socket.on('data/books/loaded', function(data) {
            factory.books = data;
            $rootScope.$broadcast('data/books/loaded', data);
            $rootScope.$apply();
        });

        socket.on('data/users/loaded', function(data) {
            factory.users = data;
            $rootScope.$broadcast('data/users/loaded', data);
            $rootScope.$apply();
        });

        return factory;

    }]);

})(window.bookApp);