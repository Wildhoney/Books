(function($bookApp) {

    /**
     * @controller Auth
     */
    $bookApp.factory('auth', ['$q', '$http', 'facebook', function($q, $http, facebook) {

        var factory = {};

        /**
         * @property token
         * @type {String}
         */
        factory.token = null;

        /**
         * @property userId
         * @type {Number}
         */
        factory.userId = null;

        /**
         * @method getUser
         * @return {$q.promise}
         */
        factory.getUser = function getUser() {

            var defer = $q.defer();

            facebook.getLoginStatus(function(response) {

                if (response.status === 'not_authorized') {
                    defer.reject();
                    return;
                }

                FB.api('/me', function(response) {

                    var params = {
                        first_name: response.first_name,
                        last_name:  response.last_name,
                        avatar:     'http://graph.facebook.com/' + response.username + '/picture'
                    };

                    defer.resolve(params);

                });

            });

            return defer.promise;

        };

        return factory;

    }]);

})(window.bookApp, window.FB);