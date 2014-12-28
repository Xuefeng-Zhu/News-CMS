'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
    .controller('ViewCtrl', ['$scope', '$routeParams', '$http',
        function($scope, $routeParams, $http) {
        	var title = $routeParams['title'];

        	$http({
        		url: 'http://localhost:5000/news',
        		method: 'GET',
        		params: {title: title}
        	})
        	.success(function(response){
        		$scope.news = response;
        	})

        }
    ]);