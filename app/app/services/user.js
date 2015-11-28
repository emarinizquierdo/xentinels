'use strict';

angular.module('xentinels').factory('User', function($resource) {

    var _User = {};

    _User.resource = $resource('/api/users/:id');

    _User.me = function(){
    	_User.resource.get({id : "me"},function(data){
    		_User.data = data;
    		_User.data.password = null;
    	}, function(){

    	});
    }

    return _User;

});
