(function($bookApp) {

    /**
     * @controller Auth
     */
    $bookApp.factory('auth', ['$q', '$http', '$window', function($q, $http, $window) {

        var factory = {};

        /**
         * @method process
         * @param data {Object}
         * @return {$q.promise}
         */
        factory.process = function(data) {

            var defer   = $q.defer(),
                url     = 'add/user';

            FB.api('/me', function(response) {

                var params = {
                    firstName:  response.first_name,
                    surname:    response.last_name,
                    token:      data.authResponse.accessToken,
                    avatar:     'http://graph.facebook.com/' + response.username + '/picture'
                };

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