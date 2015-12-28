'use strict';

angular.module('pinterestApp', [
  'pinterestApp.auth',
  'pinterestApp.admin',
  'pinterestApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'validation.match',
  'wu.masonry'
])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });
