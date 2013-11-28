(function($bookApp) {

    /**
     * @controller BookController
     */
    $bookApp.controller('BookController', ['$scope', 'socket', 'auth',

        function($scope, socket, auth) {

            /**
             * @property book
             * @type {Object}
             */
            $scope.book = { name: '', description: '', category: '' };

            /**
             * @method add
             * @param book {Object}
             * @return {void}
             */
            $scope.add = function add(book) {

                // Emit the event to add the book to the collection!
                socket.emit('data/book/add', book, auth.token);
                $scope.modal();

            };

    }]);

})(window.bookApp);