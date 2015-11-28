angular.module('xentinels').controller('logoutController', ['$scope', '$location', 'AuthService',
    function($scope, $location, AuthService) {

        $scope.logout = function() {

            console.log(AuthService.logged());

            // call logout from service
            AuthService.logout()
                .then(function() {
                    $location.path('/login');
                });

        };

    }
]);
