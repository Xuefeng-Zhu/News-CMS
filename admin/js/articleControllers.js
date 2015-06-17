'use strict';

/* Controllers */

angular.module('articleControllers', [])
    .controller('CreateCtrl', ['$scope', '$http', 'upload', '$sce', '$location',
        function($scope, $http, upload, $sce, $location) {
            $scope.news = {};
            $scope.tags = [];

            $scope.submit = function() {
                $scope.news.content = quill.getHTML();
                $scope.news.tags = [];
                angular.forEach($scope.tags, function(tag) {
                    $scope.news.tags.push(tag.name);
                })

                $http.put(url + '/news', angular.copy($scope.news))
                    .success(function() {
                        swal({
                            title: 'Success!',
                            text: 'A new article has been created!',
                            type: 'success',
                            showCancelButton: true,
                            cancelButtonText: 'Create More',
                            confirmButtonText: 'Go to News List',
                            closeOnConfirm: false
                        }, function() {
                            location.replace('#list');
                            swal.close();
                        });

                        $scope.news = {};
                        $scope.tags = [];
                        $scope.link = '';
                        quill.setText('');
                    })
                    .error(function(response) {
                        swal('Error!', 'Title is empty or has already existed!', 'error');
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
                    });
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
    .controller('EditCtrl', ['$scope', '$http', 'upload', '$sce', '$routeParams', '$location',
        function($scope, $http, upload, $sce, $routeParams, $location) {
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
                        swal('Error!', 'Title is empty or has already existed!', 'error');
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
                    });
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
    .controller('ViewCtrl', ['$scope', '$routeParams', '$http', '$sce', '$cookies',
        function($scope, $routeParams, $http, $sce, $cookies) {
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
                swal({
                    title: 'Are you sure?',
                    text: 'This news will be deleted!',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#DD6B55',
                    confirmButtonText: 'Yes, delete it!',
                    closeOnConfirm: false
                }, function() {
                    $http({
                        url: url + '/news',
                        method: 'DELETE',
                        params: {
                            id: $scope.news.id
                        }
                    }).success(function() {
                        $cookies['refreshList'] = 'true';

                        swal({
                            title: 'Deleted!',
                            text: 'This news has been deleted!',
                            type: 'success',
                            timer: 2000,
                            closeOnConfirm: false
                        }, function() {
                            window.close();
                        });
                    });
                });
            };
        }
    ]);