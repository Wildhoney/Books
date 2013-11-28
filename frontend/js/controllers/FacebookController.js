(function($bookApp) {

    /**
     * @controller FacebookController
     */
    $bookApp.controller('FacebookController', ['$scope', '$location', 'facebook', 'auth',

    function($scope, $location, facebook, auth) {

        auth.getUser();

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

            $scope.$on('facebook/status/notauthorized', function() {
                $scope.connected    = false;
                $scope.checking     = false;
                $scope.$apply();
            });

            $scope.$on('facebook/status/denied', function() {
                $scope.connected    = false;
                $scope.checking     = false;
            });

            $scope.$on('facebook/status/unknown', function() {
                $scope.connected    = false;
                $scope.checking     = false;
            });

    }]);

})(window.bookApp);