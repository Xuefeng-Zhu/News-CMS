'use strict';

/* Controllers */

angular.module('articleControllers', [])
    .controller('CreateCtrl', ['$scope', '$http', 'upload', '$sce', '$cookies', '$location',
        function($scope, $http, upload, $sce, $cookies, $location) {
            if (!$cookies['token']) {
                alert('Please login in');
                $location.path('/login');
            }
            $http.defaults.headers.common['token'] = $cookies['token'];

            $scope.news = {};
            $scope.tags = []

            $scope.submit = function() {
                $scope.news.content = quill.getHTML();
                $scope.news.tags = [];
                angular.forEach($scope.tags, function(tag) {
                    $scope.news.tags.push(tag.name);
                })

                $http.put(url + '/news', angular.copy($scope.news))
                    .success(function() {
                        alert("success");
                        $scope.news = {};
                        $scope.tags = [];
                        $scope.link = '';
                        quill.setText('');
                    })
                    .error(function(response) {
                        alert("Title is empty or has already existed");
                    });

            }

            $scope.preview = function() {
                $scope.news.content = $sce.trustAsHtml(quill.getHTML());
            }

            $scope.loadArticle = function() {
                $http.get([url, 'load_article', $scope.link].join('/'))
                    .success(function(response) {
                        $scope.news = response;
                        quill.setHTML(response.content);
                    })
            }

            $scope.insertImage = function() {
                quill.insertEmbed(quill.getLength(), 'image', $scope.newImage);
                $scope.newImage = null;
            }

            $scope.onNewsPicUpload = function(response) {
                $scope.news.news_pic = response.data.url;
            }

            $scope.onNewImageUpload = function(response) {
                $scope.newImage = response.data.url;
            }
        }
    ])
    .controller('EditCtrl', ['$scope', '$http', 'upload', '$sce', '$routeParams', '$cookies', '$location',
        function($scope, $http, upload, $sce, $routeParams, $cookies, $location) {
            if (!$cookies['token']) {
                alert('Please login in');
                $location.path('/login');
            }
            $http.defaults.headers.common['token'] = $cookies['token'];

            var title = $routeParams['title'];

            $http({
                url: url + '/news',
                method: 'GET',
                params: {
                    title: title
                }
            }).success(function(response) {
                $scope.news = response;

                var tags = response.tags;
                $scope.tags = [];
                for (var i in tags) {
                    $scope.tags.push({
                        name: tags[i]
                    });
                }
                quill.setHTML(response.content);
            })

            $scope.submit = function() {
                $scope.news.content = quill.getHTML();
                $scope.news.tags = [];
                angular.forEach($scope.tags, function(tag) {
                    $scope.news.tags.push(tag.name);
                })

                $http.post(url + '/news', angular.copy($scope.news))
                    .success(function() {
                        $location.path('view/' + $scope.news.title)
                    })
                    .error(function(response) {
                        alert("Title is empty or has already existed");
                    });
            }

            $scope.preview = function() {
                $scope.news.content = $sce.trustAsHtml(quill.getHTML());
            }

            $scope.loadArticle = function() {
                $http.get([url, 'load_article', $scope.link].join('/'))
                    .success(function(response) {
                        $scope.news = response;
                        quill.setHTML(response.content);
                    })
            }

            $scope.insertImage = function() {
                quill.insertEmbed(quill.getLength(), 'image', $scope.newImage);
                $scope.newImage = null;
            }

            $scope.onNewsPicUpload = function(response) {
                $scope.news.news_pic = response.data.url;
            }

            $scope.onNewImageUpload = function(response) {
                $scope.newImage = response.data.url;
            }
        }
    ])
    .controller('ViewCtrl', ['$scope', '$routeParams', '$http', '$sce',
        function($scope, $routeParams, $http, $sce) {
            var title = $routeParams['title'];

            $http({
                url: url + '/news',
                method: 'GET',
                params: {
                    title: title
                }
            }).success(function(response) {
                $scope.news = response;
                $scope.news.content = $sce.trustAsHtml($scope.news.content);
            })

            $scope.deleteNews = function() {
                if (confirm("Are you sure to delete this news?") == true) {
                    $http({
                        url: url + '/news',
                        method: 'DELETE',
                        params: {
                            id: $scope.news.id
                        }
                    }).success(function() {
                        alert("success");
                        window.close();
                    })
                }
            }

        }
    ]);