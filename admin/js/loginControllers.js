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

        // var a = new Date();
        // var data = {
        //     tournamentName: 'test',
        //     size: 2,
        //     rounds: [{
        //         startTime: a.toDateString(),
        //         bestOfN: 1
        //     }]
        // }
        // $http.defaults.headers.common['token'] = 'eyJhbGciOiJIUzI1NiIsImV4cCI6MTQyMTQ3ODUwMCwiaWF0IjoxNDIxMTE4NTAwfQ.IjU0YjJlMjIyMDU1MWRjMjhjNmVmNGQ5OCI.w5zqk8OXjC-iKPD33p-Rs8U8XAVCO_f4f2iXzsUpkzI';
        // $http.post('http://54.149.235.253:5000/create_tournament', data)
        // .success()
    }
]);