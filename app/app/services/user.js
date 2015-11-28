'use strict';

angular.module('xentinels')
    .factory('User', function($resource) {
        return $resource('/api/user');
    });
