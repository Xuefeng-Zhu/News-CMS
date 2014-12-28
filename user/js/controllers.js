'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
    .controller('ViewCtrl', ['$scope', '$routeParams', '$http',
        function($scope, $routeParams, $http) {
        	var title = $routeParams['title'];

        	$http({
        		url: 'https://lit-everglades-2593.herokuapp.com/news',
        		method: 'GET',
        		params: {title: title}
        	})
        	.success(function(response){
        		$scope.news = response;
        	})

        }
    ]);