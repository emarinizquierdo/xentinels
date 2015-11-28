'use strict';

angular.module('xentinels', ['ngRoute', 'ngResource'])
    .config(function($routeProvider, $locationProvider) {

        $routeProvider
            .when('/', {
                templateUrl: '/app/views/main.html',
                controller: 'MainCtrl',
                access: {
                    restricted: false
                }
            })
            .when('/user/edit', {
                templateUrl: '/app/views/user/edit.html',
                controller: 'UserEditCtrl',
                access: {
                    restricted: true
                }
            })
            .when('/login', {
                templateUrl: 'app/views/login.html',
                controller: 'loginController',
                access: {
                    restricted: false
                }
            })
            .when('/logout', {
                controller: 'logoutController',
                access: {
                    restricted: false
                }
            })
            .when('/register', {
                templateUrl: 'app/views/register.html',
                controller: 'registerController',
                access: {
                    restricted: false
                }
            })
            .otherwise({
                redirectTo: '/'
            });

        $locationProvider.html5Mode(true);

    });

angular.module('xentinels')
    .run(function($rootScope, $location, $route, AuthService) {
        $rootScope.$on('$routeChangeStart', function(event, next, current) {
            if (next.access.restricted && AuthService.isLoggedIn() === false) {
                $location.path('/login');
                //$route.reload();
            }
        });
    });

angular.module('xentinels')
    .controller('AppCtrl', ['$scope', 'AuthService',
        function($scope, AuthService) {

            AuthService.logged().then(function() {}, function() {});

        }
    ]);
