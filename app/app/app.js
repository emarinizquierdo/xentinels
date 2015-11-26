'use strict';

angular.module('xentinels', ['ngRoute'])
    .config(function($routeProvider, $locationProvider) {

        $routeProvider
            .when('/', {
                templateUrl: '/app/views/main.html',
                controller: 'MainCtrl'
            })
            .when('/user/edit', {
                templateUrl: '/app/views/user/edit.html',
                controller: 'UserEditCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });

        $locationProvider.html5Mode(true);

    });


angular.module('xentinels')
    .controller('AppCtrl', function($scope) {

    });
