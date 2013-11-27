(function($bookApp) {

    /**
     * @service socket
     */
    $bookApp.factory('socket', ['$rootScope', function($rootScope) {

        /**
         * @property url
         * @type {String}
         */
        var url = 'http://localhost:8888';

        // Connect to the Socket.io server.
        return io.connect(url);

    }]);

})(window.bookApp);