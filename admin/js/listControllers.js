'use strict';

/* Controllers */

angular.module('listControllers', []).
controller('ListCtrl', ['$scope', '$http', '$cookies',
    function($scope, $http, $cookies) {
        $scope.cookies = $cookies;
        $scope.page = 0;
        $scope.tags = [];

        $scope.searchNews = function() {
            var data = {
                search: $scope.search,
                tags: [],
                page: $scope.page
            }

            angular.forEach($scope.tags, function(tag) {
                data.tags.push(tag.name);
            })

            $http.post(url + '/search_news', data)
                .success(function(response) {
                    $scope.newsList = response;
                })
        }

        $scope.changePage = function(num) {
            $scope.page += num;
            $scope.searchNews();
        }

        $scope.searchNews();

        $scope.$watch('cookies.refreshList', function(){
            if ($scope.cookies['refreshList']){
                $scope.searchNews();
                $scope.cookies['refreshList'] = undefined;
            }            
        });
    }
]);