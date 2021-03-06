/**
 * Created by vollt on 2017/4/6.
 */
angular
    .module('ustc-oj')
    .controller("editNewsCtrl", function ($routeParams, $scope, $http, $rootScope, $window,
                                      networkService, problemService, adminService) {
        $scope.news_id = null;
        $scope.news_title = null;
        $scope.news_index = 0;
        $scope.news_excerpt = null;
        $scope.news_content = null;
        $scope.author = null;
        $scope.problemEdit = null;
        $scope.finishLoading = false;

        if ($routeParams.news_ID == null) {

        }
        else {
            $scope.news_id = $routeParams.news_ID;
            adminService.getNews(function(data){
                var news = data.news;
                console.log(news)
                $scope.news_id = news.news_id
                $scope.excerpt_editor = news.news_excerpt;
                $scope.content_editor = news.news_content
                $scope.news_title = news.news_title;
                $scope.news_index = news.news_index;
                $scope.finishLoading = true;
            }, $scope.news_id);
        }

        $scope.submitNews = function () {
            var newsData = {
                news_title: $scope.news_title,
                news_excerpt: $scope.excerpt_editor,
                news_content: $scope.content_editor,
                news_index: $scope.news_index
            };
            if ($scope.news_id)
                newsData["news_id"] = $scope.news_id
            adminService.addNews(function(data){
                $window.location.href = '#/';
            }, newsData);
        }

    });