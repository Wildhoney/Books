(function($bookApp, $fb) {

    /**
     * @controller Facebook
     */
    $bookApp.factory('facebook', ['$rootScope', function($rootScope) {

        $fb.init({
            appId      : '689697127716548',
            status     : true,
            cookie     : true,
            xfbml      : true
        });

        /**
         * @method _broadcast
         * @param response {Object}
         * @return {void}
         * @private
         */
        var _broadcast = function emit(response) {
            $rootScope.$broadcast('facebook/status/' + response.status.replace(/_/, ''), response);
        };

        // Initiate the process for determining the login status.
        $fb.getLoginStatus(function(response) {
            _broadcast(response);
        });

        // When the Facebook authentication event occurs.
        $fb.Event.subscribe('auth.authResponseChange', function(response) {
            _broadcast(response);
        });

        return $fb;

    }]);

})(window.bookApp, window.FB);