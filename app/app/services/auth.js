angular.module('xentinels').factory('AuthService', ['$q', '$location', '$timeout', '$http', '$cookies',
    function($q, $location, $timeout, $http, $cookies) {

        var _Auth = {};

        // create user variable
        var user = null;

        _Auth.isLogged = false;

        // return available functions for use in controllers
        _Auth.logged = logged;
        _Auth.login = login;
        _Auth.logout = logout;
        _Auth.register = register;
        _Auth.signout = removeSession;

        function removeSession() {
            $cookies.remove("auth");
            _Auth.isLogged = false;
            $location.path("/");
        }

        function logged() {
            if ($cookies.get("auth")) {
                _Auth.isLogged = true;
                return true;
            } else {
                return false;
            }
        }

        function login(email, password) {

            // create a new instance of deferred
            var deferred = $q.defer();

            // send a post request to the server
            $http.post('/api/users/login', {
                    user_name: email,
                    password: password
                })
                // handle success
                .success(function(data, status) {
                    if (status === 200 && data) {
                        _Auth.isLogged = true;
                        deferred.resolve(data);
                    } else {
                        _Auth.isLogged = false;
                        deferred.reject();
                    }
                })
                // handle error
                .error(function(data) {
                    _Auth.isLogged = false;
                    deferred.reject();
                });

            // return promise object
            return deferred.promise;

        }


        function logout() {

            // create a new instance of deferred
            var deferred = $q.defer();

            // send a get request to the server
            $http.get('/api/logout')
                // handle success
                .success(function(data) {
                    user = false;
                    deferred.resolve();
                })
                // handle error
                .error(function(data) {
                    user = false;
                    deferred.reject();
                });

            // return promise object
            return deferred.promise;

        }

        function register(email, password) {

            // create a new instance of deferred
            var deferred = $q.defer();

            // send a post request to the server
            $http.post('/api/register', {
                    email: email,
                    password: password
                })
                // handle success
                .success(function(data, status) {
                    if (status === 200 && data.result) {
                        deferred.resolve();
                    } else {
                        deferred.reject();
                    }
                })
                // handle error
                .error(function(data) {
                    deferred.reject();
                });

            // return promise object
            return deferred.promise;

        }

        return _Auth;
    }
]);
