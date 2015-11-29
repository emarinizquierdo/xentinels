(function() {
    'use strict'


    angular.module('xentinels').controller('deviceDetail', ["$scope", "$location", "$routeParams", "User", "Device", function($scope, $location, $routeParams, User, Device) {

        var marker;
        var map;

        $scope.Device = Device;
        $scope.deviceData;

        function __init__() {
            if ($routeParams.id) {
                Device.resource.get({
                    id: $routeParams.id
                }, function(data) {
                    $scope.deviceData = data;
                    initMap();
                }, function() {
                    $location.path("/");
                });
            }
        }

        __init__();

        $scope.edit = function(status) {
            if (status) {
                marker.setDraggable(true);
                $scope.editing = true;
                initMap();
            } else {
                marker.setDraggable(false);
                $scope.editing = false;
            }
        };

        $scope.updateDevice = function(device) {

            Device.resource.update(device, function(data) {
                $scope.deviceData = data[0];
                $scope.edit(false);
            }, function() {
                $scope.edit(false);
            });

        };

        function setPosition(position) {
            $scope.deviceData.lat = position.coords.latitude;
            $scope.deviceData.lng = position.coords.longitude;
            drawMark();
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        }

        $scope.centerMe = function() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(setPosition);
            }
        }

        function centerMark(){
            var bounds = new google.maps.LatLngBounds(new google.maps.LatLng($scope.deviceData.lat || 59.325, $scope.deviceData.lng || 18.070));
            map.fitBounds(bounds);
            map.setZoom(15);
        }

        function drawMark() {
            map = new google.maps.Map(document.getElementById('map'), {
                zoom: 15,
                center: {
                    lat: $scope.deviceData.lat,
                    lng: $scope.deviceData.lng
                }
            });

            marker = new google.maps.Marker({
                map: map,
                animation: google.maps.Animation.DROP,
                position: {
                    lat: $scope.deviceData.lat,
                    lng: $scope.deviceData.lng
                }
            });

            marker.addListener('dragend', getLatLong);
        }

        function initMap() {

            if (map){
                centerMark()
                return;
            }

            if (!($scope.deviceData.lat && $scope.deviceData.lng)) {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(setPosition);
                } else {
                    $scope.deviceData.lat = 59.325;
                    $scope.deviceData.lng = 18.070;
                    drawMark();
                }
            } else {
                drawMark();
            }


        }

        function getLatLong(event) {
            $scope.deviceData.lat = event.latLng.lat();
            $scope.deviceData.lng = event.latLng.lng();
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        }


    }]);

})();
