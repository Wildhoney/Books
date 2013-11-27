(function($bookApp) {

    /**
     * @controller FacebookController
     */
    $bookApp.controller('FacebookController', ['$scope', '$location', 'facebook', 'auth',

        function($scope, $location, facebook, auth) {

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

        /**
         * @event facebook/status/connected
         * @param response {Object}
         */
        $scope.$on('facebook/status/connected', function(event, response) {

            auth.process(response).then(function(data) {
                $location.path('/begin');
            });

            $scope.$apply();
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