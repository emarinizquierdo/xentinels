'use strict';

angular.module('xentinels', ['ngRoute', 'ngResource', 'ngCookies'])
    .config(function($routeProvider, $locationProvider) {

        $routeProvider
            .when('/', {
                templateUrl: '/app/views/main.html',
                controller: 'MainCtrl',
                access: {
                    restricted: false
                }
            })
            .when('/account/info', {
                templateUrl: '/app/views/account/info.html',
                controller: 'accountInfo',
                access: {
                    restricted: true
                }
            })
            .when('/account/auth', {
                templateUrl: 'app/views/account/signup.html',
                controller: 'signup',
                access: {
                    restricted: false
                }
            })
            .when('/account/signin', {
                templateUrl: 'app/views/account/signin.html',
                controller: 'signin',
                access: {
                    restricted: false
                }
            })
            .when('/account/devices', {
                templateUrl: 'app/views/account/devices.html',
                controller: 'devices',
                access: {
                    restricted: false
                }
            })
            .when('/devices/detail/:id', {
                templateUrl: 'app/views/devices/detail.html',
                controller: 'deviceDetail',
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
            .otherwise({
                redirectTo: '/'
            });

        $locationProvider.html5Mode(true);

    });

angular.module('xentinels')
    .run(function($rootScope, $location, $route, AuthService) {
        $rootScope.$on('$routeChangeStart', function(event, next, current) {
            if (next.access.restricted && AuthService.logged() === false) {
                $location.path('/login');
                //$route.reload();
            }
        });
    });

angular.module('xentinels')
    .controller('AppCtrl', ['$scope', 'AuthService', 'User',
        function($scope, AuthService, User) {

            $scope.User = User;
            $scope.Auth = AuthService;

            if (AuthService.isLogged || AuthService.logged()) {
                User.me();
            }

        }
    ]);
