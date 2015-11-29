'use strict'

angular.module('xentinels').directive('navbar', ["AuthService", function(AuthService) {

    return {
        restrict: 'A',
        templateUrl: 'app/partials/navbar.html',
        link: function($scope, $element, $attrs) {


            $('.dropdown-button').dropdown();



            $scope.signOut = function() {

                AuthService.signout();

            };

        }
    };

}]);
