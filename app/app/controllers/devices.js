(function() {
    'use strict'


    angular.module('xentinels').controller('devices', ["$scope", "User", "Device", function($scope, User, Device) {

        $scope.User = User;
        $scope.Device = Device;
        $scope.newDevice;

        var collapsible = $('.collapsible').collapsible({
            accordion: false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
        });

        $scope.addNew = function(newDevice) {

            Device.resource.save(newDevice, function(data) {
                Device.data.push(data[0]);
            }, function() {

            });

            $scope.newDevice = {};
            collapsible.find(".collapsible-header").click();
        }

        $scope.deleteDevice = function() {
            
            $('#modal1').openModal();

        }

    }]);

})();
