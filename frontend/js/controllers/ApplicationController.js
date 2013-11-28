(function($bookApp) {

    /**
     * @controller ApplicationController
     */
    $bookApp.controller('ApplicationController', ['$scope', '$location', 'socket', 'auth',

        function($scope, $location, socket, auth) {

            /**
             * @property modalOpen
             * @type {Boolean}
             */
            $scope.modalOpen = false;

            /**
             * @method keyUp
             * @param event {Object}
             * @return {void}
             */
            $scope.keyUp = function keyUp(event) {

                if (event.keyCode === 27) {
                    // Close the modal window if the escape key was pressed.
                    $scope.modal();
                }

            };

            /**
             * @method modal
             * @param template {String}
             * @return {void}
             */
            $scope.modal = function modal(template) {

                if (!template) {
                    $scope.modalOpen = false;
                    $scope.$broadcast('modal/state/close');
                    return;
                }

                $scope.modalOpen = true;
                $scope.$broadcast('modal/state/open', template);
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

    }]);

})(window.bookApp);