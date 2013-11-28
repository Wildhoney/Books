(function($bookApp) {

    /**
     * @controller ApplicationController
     */
    $bookApp.controller('ApplicationController', ['$scope', '$location', 'auth', 'socket', 'data',

        function($scope) {

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

    }]);

})(window.bookApp);