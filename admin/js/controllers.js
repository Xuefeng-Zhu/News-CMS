'use strict';

/* Controllers */

var url = 'https://lit-everglades-2593.herokuapp.com';
// var url = 'http://localhost:5000'

angular.module('myApp.controllers', []).
controller('CreateCtrl', ['$scope', '$http', 'upload',
    function($scope, $http, upload) {
        $scope.news = {};
        $scope.news.content = [];

        $scope.submit = function() {
            $http.put(url + '/news', angular.copy($scope.news))
                .success(function() {
                    alert("success");
                })
                .error(function(response){
                	console.log(response);
                	alert("Title is empty or has already existed");
                })
        }

        $scope.insertText = function() {
            $scope.news.content.push({
                type: 'text',
                details: $scope.newText
            });

            $scope.newText = null;
        }


        $scope.insertImage = function() {
            $scope.news.content.push({
                type: 'img',
                details: $scope.newImage
            });

            $scope.newImage = null;
        }

        $scope.onNewsPicUpload = function(response) {
            $scope.news.news_pic = response.data.url;
        }

        $scope.onNewImageUpload = function(response){
        	$scope.newImage = response.data.url;
        }
    }
])
    .controller('ViewCtrl', ['$scope', '$routeParams', '$http',
        function($scope, $routeParams, $http) {
        	var title = $routeParams['title'];

        	$http({
        		url: url + '/news',
        		method: 'GET',
        		params: {title: title}
        	})
        	.success(function(response){
        		$scope.news = response;
        	})

        }
    ]);