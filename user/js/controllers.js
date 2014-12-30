'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
    .controller('ViewCtrl', ['$scope', '$routeParams', '$http', '$sce',
        function($scope, $routeParams, $http, $sce) {
            var title = $routeParams['title'];

            $http({
                url: 'https://lit-everglades-2593.herokuapp.com/news',
                method: 'GET',
                params: {
                    title: title
                }
            })
                .success(function(response) {
                    $scope.news = response;
                    $scope.news.content = $sce.trustAsHtml($scope.news.content);
                })

            

        }
    ]);