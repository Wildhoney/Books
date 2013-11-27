(function($bookApp) {

    /**
     * @controller ApplicationController
     */
    $bookApp.controller('ApplicationController', ['$scope', '$location', 'auth', 'socket', 'data',

        function($scope, $location, auth, socket, data) {

            /**
             * @property books
             * @type {Array}
             */
            $scope.books = [];

    }]);

})(window.bookApp);