(function() {
    'use strict'


    angular.module('xentinels').controller('accountInfo', ["$scope", "User", function($scope, User) {

        $scope.User = User;


        $scope.updateUser = function(data) {
            data.id = "" + new Date().getTime();




            User.resource.save(data, function( data ) {
                User.data = data;
            }, function() {

            });
        };

        __init__();

        function __init__(){
            
        }


        $('.datepicker').pickadate({
            selectMonths: true, // Creates a dropdown to control month
            selectYears: 15 // Creates a dropdown of 15 years to control year
        });

    }]);

})();
