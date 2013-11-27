(function($bookApp) {

    /**
     * @controller ApplicationController
     */
    $bookApp.controller('ApplicationController', ['$scope', 'facebook', function($scope, facebook) {

        /**
         * @property loaded
         * @type {Boolean}
         */
        $scope.loaded = false;

    }]);

})(window.bookApp);