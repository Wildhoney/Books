(function($bookApp) {

    /**
     * @controller Auth
     */
    $bookApp.factory('auth', ['$q', '$http', 'facebook', function($q, $http, facebook) {

        var factory = {};

        /**
         * @property user
         * @type {Object}
         */
        factory.user = {};

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

        /**
         * @method process
         * @param data {Object}
         * @return {$q.promise}
         */
        factory.process = function(data) {

            var defer   = $q.defer(),
                url     = 'add/user';

            factory.getUser().then(function(params) {

                // Add the token data as well.
                params.token = data.authResponse.accessToken;

                // Perform the request for adding the user.
                $http.post(url, params).then(function(data) {
                    defer.resolve(data);
                });

            });

            return defer.promise;

        };

        return factory;

    }]);

})(window.bookApp, window.FB);