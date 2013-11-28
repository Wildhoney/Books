(function($bookApp) {

    /**
     * @controller ModalController
     */
    $bookApp.controller('ModalController', ['$scope',

        function($scope) {

            // When the modal window is opened.
            $scope.$on('modal/state/open', function(event, template) {
                console.log(template);
            });

            // When the modal window is closed.
            $scope.$on('modal/state/close', function() {

            });

    }]);

})(window.bookApp);