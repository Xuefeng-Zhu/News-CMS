'use strict';

/* Controllers */

angular.module('articleControllers', [])
    .controller('CreateCtrl', ['$scope', '$http', 'upload', '$sce',
        function($scope, $http, upload, $sce) {
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
                    })
                    .error(function(response) {
                        alert("Title is empty or has already existed");
                    });
                $scope.news = {};
                $scope.tags = [];
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
            })
                .success(function(response) {
                    $scope.news = response;
                    $scope.news.content = $sce.trustAsHtml($scope.news.content);
                })

        }
    ]);