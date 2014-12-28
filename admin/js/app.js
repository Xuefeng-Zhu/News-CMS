'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.controllers',
  'lr.upload'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/create', {templateUrl: 'partials/create.html', controller: 'CreateCtrl'});
  $routeProvider.when('/view/:title', {templateUrl: 'partials/view.html', controller: 'ViewCtrl'});
  $routeProvider.otherwise({redirectTo: '/create'});
}]);
