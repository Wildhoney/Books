(function($bookApp) {

    /**
     * @controller ModalController
     */
    $bookApp.controller('ModalController', ['$scope', 'socket',

        function($scope, socket) {

            /**
             * @property template
             * @type {String}
             */
            $scope.template = null;

            /**
             * @property params
             * @type {Object}
             */
            $scope.params = {};

            // Once we've obtained the user data.
            socket.on('user/data/loaded', function(data) {
                $scope.params.data = data;
                $scope.$apply();
            });

            // Once we've obtained the book data.
            socket.on('book/data/loaded', function(data) {
                $scope.params.data = data;
                $scope.$apply();
            });

            // When the modal window is opened.
            $scope.$on('modal/state/open', function(event, template, params) {

                $scope.params   = params;
                $scope.template = 'views/modal/' + template;

                if (params && params.emit) {
                    socket.emit(params.emit.trim(), params);
                }

            });

            // When the modal window is closed.
            $scope.$on('modal/state/close', function() {
                $scope.template = null;
            });

    }]);

})(window.bookApp);