'use strict'

angular.module('xentinels').directive('sidenav', ["AuthService", function(AuthService) {

    return {
        restrict: 'A',
        templateUrl: 'app/partials/sidenav.html',
        link: function($scope, $element, $attrs) {


            $(".button-collapse").sideNav();

        }
    };

}]);
