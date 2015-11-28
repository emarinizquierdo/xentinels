(function() {
    'use strict'


    angular.module('xentinels').controller('UserEditCtrl', ["$scope", "User", function($scope, User){


    	$scope.updateUser = function(data){
    		data.id = "" + new Date().getTime();
    		User.save(data, function(){

    		}, function(){

    		});
    	};


$('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15 // Creates a dropdown of 15 years to control year
  });

    }]);

})();
