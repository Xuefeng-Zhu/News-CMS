'use strict';

/* Controllers */

angular.module('loginControllers', []).
controller('LoginCtrl', ['$scope', '$http','$cookies', '$location',
    function($scope, $http, $cookies, $location) {
        $scope.login = function() {
            var data = {
                email: $scope.email,
                password: $scope.password
            };
            $http.post(loginUrl, data)
                .success(function(response) {
                    $cookies['token'] = response['token'];
                    $location.path('/list')
            })
        }
    }
]);