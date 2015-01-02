'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'articleControllers',
  'listControllers',
  'lr.upload',
  'ngSanitize',
  'ngTagEditor'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/create', {templateUrl: 'partials/create.html', controller: 'CreateCtrl'});
  $routeProvider.when('/list', {templateUrl: 'partials/list.html', controller: 'ListCtrl'});
  $routeProvider.when('/view/:title', {templateUrl: 'partials/view.html', controller: 'ViewCtrl'});
  $routeProvider.when('/edit/:title', {templateUrl: 'partials/edit.html', controller: 'EditCtrl'});
  $routeProvider.otherwise({redirectTo: '/create'});
}]);

var url = 'https://lit-everglades-2593.herokuapp.com';
// var url = 'http://localhost:5000'
