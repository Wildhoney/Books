(function($bookApp, $fb) {

    /**
     * @controller Facebook
     */
    $bookApp.factory('facebook', ['$rootScope', function($rootScope) {

        $fb.init({
            appId      : '689697127716548',
            status     : true, // check login status
            cookie     : true, // enable cookies to allow the server to access the session
            xfbml      : true  // parse XFBML
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
        $fb.getLoginStatus();

        // When the Facebook authentication event occurs.
        $fb.Event.subscribe('auth.authResponseChange', function(response) {
            _broadcast(response);
        });

        return $fb;

    }]);

})(window.bookApp, window.FB);