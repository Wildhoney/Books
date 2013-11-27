(function($bookApp) {

    /**
     * @controller BooksController
     */
    $bookApp.controller('BooksController', ['$scope', 'data',

        function($scope, data) {

            /**
             * @property books
             * @type {Array}
             */
            $scope.books = [];

            // When the books have been loaded.
            $scope.$on('data/books/loaded', function(event, data) {
                $scope.books = data;
            });

    }]);

})(window.bookApp);