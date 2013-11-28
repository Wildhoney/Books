(function($bookApp) {

    /**
     * @controller FacebookController
     */
    $bookApp.controller('FacebookController', ['$scope', '$location', 'facebook',

    function($scope, $location, facebook) {

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

    }]);

})(window.bookApp);