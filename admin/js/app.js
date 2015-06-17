'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
    'ngRoute',
    'ngCookies',
    'lr.upload',
    'ngSanitize',
    'ngTagEditor',
    'loginControllers',
    'articleControllers',
    'listControllers'
])
    .run(['$rootScope', '$http', '$cookies', '$location',
        function($rootScope, $http, $cookies, $location) {
            $rootScope.location = $location;

            $rootScope.$watch('location.path()', function() {
                if ($location.path() != '/login' && !$cookies['token']) {
                    swal('Please login in');
                    $location.path('/login');
                }
            });

            $http.defaults.headers.common['token'] = $cookies['token'];
        }
    ])
    .config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.when('/login', {
                templateUrl: 'partials/login.html',
                controller: 'LoginCtrl'
            });
            $routeProvider.when('/create', {
                templateUrl: 'partials/create.html',
                controller: 'CreateCtrl'
            });
            $routeProvider.when('/list', {
                templateUrl: 'partials/list.html',
                controller: 'ListCtrl'
            });
            $routeProvider.when('/view/:title', {
                templateUrl: 'partials/view.html',
                controller: 'ViewCtrl'
            });
            $routeProvider.when('/edit/:title', {
                templateUrl: 'partials/edit.html',
                controller: 'EditCtrl'
            });
            $routeProvider.otherwise({
                redirectTo: '/login'
            });
        }
    ])
    .filter('encodeUrl', function() {
        return function(input) {
            return encodeURIComponent(input);
        };
    });

// var loginUrl = "http://localhost:5000/login"
var loginUrl = "https://floating-retreat-4846.herokuapp.com/login"
var url = 'https://lit-everglades-2593.herokuapp.com';
//var url = 'http://localhost:5000'