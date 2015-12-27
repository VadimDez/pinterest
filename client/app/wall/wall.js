'use strict';

angular.module('pinterestApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('wall', {
        url: '/wall/:id',
        templateUrl: 'app/wall/wall.html',
        controller: 'WallCtrl',
        controllerAs: 'wallCtrl'
      });
  });
