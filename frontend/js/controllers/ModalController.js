(function($bookApp) {

    /**
     * @controller ModalController
     */
    $bookApp.controller('ModalController', ['$scope',

        function($scope) {

            /**
             * @property template
             * @type {String}
             */
            $scope.template = null;

            // When the modal window is opened.
            $scope.$on('modal/state/open', function(event, template) {
                $scope.template = 'views/modal/' + template;
            });

            // When the modal window is closed.
            $scope.$on('modal/state/close', function() {
                $scope.template = null;
            });

    }]);

})(window.bookApp);