angular.module('xentinels').controller('signin', ['$scope', '$location', 'AuthService', 'User',
    function($scope, $location, AuthService, User) {

        console.log(AuthService.logged());

        $scope.baseUrl = location.origin;
        $scope.goto = function(route) {

            location.href = route;

        };

        $scope.login = function() {

            // initial values
            $scope.error = false;
            $scope.disabled = true;

            // call login from service
            AuthService.login($scope.loginForm.email, $scope.loginForm.password)
                // handle success
                .then(function() {
                    User.me();
                    $location.path('/');
                    $scope.disabled = false;
                    $scope.loginForm = {};
                })
                // handle error
                .catch(function() {
                    $scope.error = true;
                    $scope.errorMessage = "Invalid username and/or password";
                    $scope.disabled = false;
                    $scope.loginForm = {};
                });

        };

    }
]);
