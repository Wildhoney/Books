(function($bookApp) {

    /**
     * @controller FiltersController
     */
    $bookApp.controller('FiltersController', ['$scope',

        function($scope) {

            /**
             * @property category
             * @type {Boolean}
             */
            $scope.category = '';

            /**
             * @method setCategory
             * @param name {String}
             * @return {void}
             */
            $scope.setCategory = function setCategory(name) {

                if ($scope.category === name) {
                    $scope.category = '';
                    return;
                }

                $scope.category = name;

            };

    }]);

})(window.bookApp);