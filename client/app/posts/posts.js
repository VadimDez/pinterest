'use strict';

angular.module('pinterestApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('posts', {
        url: '/posts',
        templateUrl: 'app/posts/posts.html',
        controller: 'PostsCtrl',
        controllerAs: 'postsCtrl'
      });
  });
