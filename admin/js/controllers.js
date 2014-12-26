'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('CreateCtrl', ['$scope', '$http', function($scope, $http) {
  	$scope.news = {}
  	$scope.submit = function(){
  		$http.put('http://localhost:5000/news', angular.copy($scope.news))
  		.success(function(){
  			alert("success")
  		})
  	}

  }])
  .controller('MyCtrl2', [function() {

  }]);