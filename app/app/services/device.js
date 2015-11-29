'use strict';

angular.module('xentinels').factory('Device', function($rootScope, $resource) {

    var _Device = {};

    _Device.data = [];

    _Device.resource = $resource('/api/device/:id', {
        id: '@id'
    }, {
        save: {
            method: 'POST',
            isArray: true
        },
        delete: {
            method: 'DELETE',
            isArray: true
        },
        update: {
            method: 'PUT',
            isArray: true
        }
    });

    _Device.all = function() {

        _Device.resource.get(function(data) {
            if (data && data.results) {
                _Device.data = data.results;
            }
        }, function() {

        });
    }

    _Device.all();


    return _Device;

});
