(function() {
    'use strict'

    angular.module('xentinels').controller('signup', ["$scope", "User", function($scope, User) {

        $scope.User = User;


        $scope.signup = function(data) {

            User.resource.save(data, function( data ) {
                User.data = data;
            }, function() {

            });
            
        };

    }]);

})();
