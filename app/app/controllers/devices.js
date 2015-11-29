(function() {
    'use strict'


    angular.module('xentinels').controller('devices', ["$scope", "$location", "User", "Device", function($scope, $location, User, Device) {

        $scope.User = User;
        $scope.Device = Device;
        $scope.newDevice;

        var toDelete = null;

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

        $scope.goToDetail = function(id){
            $location.path("devices/detail/" + id);
        }

        $scope.beforeToDelete = function(device) {
            toDelete = device;
            $('#modal1').openModal();

        }

        $scope.deleteDevice = function() {
            $('#modal1').closeModal();
            Device.resource.delete(toDelete, function(data) {
                localDelete(Device.data, data[0]);
            }, function(e) {

            })
        }

        function localDelete(array, data) {
            angular.forEach(array, function(item, index) {
                if (item.id === data.id) {
                    array.splice(index, 1);
                    return false;
                }
            });
        }

    }]);

})();
