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

        /**
         * @method findUser
         * @param id {Number}
         * @return {Object}
         */
        factory.findUser = function findUser(id) {
            return _.findWhere(factory.users, { id: id });
        };

        // When a user begins reading a book.
        socket.on('data/reading/started', function(userId, bookId) {

            var model       = _.findWhere(factory.books, { id: bookId, user_id: userId });
            model.reader_id = userId;
            $rootScope.$apply();

        });

        // When a user finishes reading a book.
        socket.on('data/reading/finished', function(userId, bookId) {

            var model       = _.findWhere(factory.books, { id: bookId, user_id: userId });
            model.reader_id = null;
            $rootScope.$apply();

        });

        // When all of the books have been loaded.
        socket.on('data/books/loaded', function(data) {
            factory.books = data;
            $rootScope.$broadcast('data/books/loaded', data);
            $rootScope.$apply();
        });

        // When all of the users have been loaded.
        socket.on('data/users/loaded', function(data) {
            factory.users = data;
            $rootScope.$broadcast('data/users/loaded', data);
            $rootScope.$apply();
        });

        return factory;

    }]);

})(window.bookApp);