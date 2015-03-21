'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.controllers',
  'ngSanitize'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view/:title', {templateUrl: 'partials/view.html', controller: 'ViewCtrl'});
}]);
