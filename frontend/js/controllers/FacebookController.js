(function($bookApp) {

    /**
     * @controller FacebookController
     */
    $bookApp.controller('FacebookController', ['$scope', '$location', 'facebook', 'auth', 'socket',

        function($scope, $location, facebook, auth, socket) {

        /**
         * @property connected
         * @type {Boolean}
         */
        $scope.connected = null;

        /**
         * @property checking
         * @type {Boolean}
         */
        $scope.checking = true;

        /**
         * @method signIn
         * @return {void}
         */
        $scope.signIn = function signIn() {
            facebook.login();
        };

        // When the full handshake has been completed.
        socket.on('facebook/handshake/complete', function(token) {

            // Save the access token for personalised requests that we make.
            auth.token = token;

            $location.path('/begin');
            $scope.$apply();


        });

        /**
         * @event facebook/status/connected
         * @param response {Object}
         */
        $scope.$on('facebook/status/connected', function(event, response) {

            auth.getUser().then(function(data) {
                data.auth = response.authResponse;
                socket.emit('facebook/handshake/initiate', data);
            });

        });

        /**
         * @event facebook/status/notauthorized
         * @param response {Object}
         */
        $scope.$on('facebook/status/notauthorized', function(response) {
            $scope.connected    = false;
            $scope.checking     = false;
            $scope.$apply();
        });

    }]);

})(window.bookApp);