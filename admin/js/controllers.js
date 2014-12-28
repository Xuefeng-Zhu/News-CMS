'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
controller('CreateCtrl', ['$scope', '$http', 'upload',
    function($scope, $http, upload) {
        $scope.news = {}
        $scope.news.content = []

        $scope.submit = function() {
            $http.put('http://localhost:5000/news', angular.copy($scope.news))
                .success(function() {
                    alert("success")
                });
        }

        $scope.insertText = function() {
            $scope.news.content.push({
                type: 'text',
                details: $scope.newText
            });
            
            $scope.newText = null;
        }

        $scope.onNewsPicUpload = function(response) {
            $scope.news.news_pic = response.data.url;
        }

    }
])
    .controller('MyCtrl2', [

        function() {

        }
    ]);