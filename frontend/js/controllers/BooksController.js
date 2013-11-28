(function($bookApp) {

    /**
     * @controller BooksController
     */
    $bookApp.controller('BooksController', ['$scope', 'data', 'socket', 'auth',

        function($scope, data, socket, auth) {

            /**
             * @property books
             * @type {Array}
             */
            $scope.books = [];

            /**
             * @method findUser
             * @param id {Number}
             * @return {Object}
             */
            $scope.findUser = data.findUser;

            // When the books have been loaded.
            $scope.$on('data/books/loaded', function(event, data) {
                $scope.books = data;
            });

            /**
             * @method iAmReading
             * @param book {Object}
             * @return {Boolean}
             */
            $scope.iAmReading = function iAmReading(book) {
                console.log(book.reader_id);
                console.log(auth.userId);
                return (book.reader_id === auth.userId);
            };

            /**
             * @method startReading
             * @param book {Object}
             * @return {void}
             */
            $scope.startReading = function startReading(book) {
                socket.emit('data/reading/start', { book_id: book.id }, auth.token);
            };

            /**
             * @method finishedReading
             * @param book {Object}
             * @return {void}
             */
            $scope.finishedReading = function startReading(book) {
                socket.emit('data/reading/finish', { book_id: book.id }, auth.token);
            };

    }]);

})(window.bookApp);