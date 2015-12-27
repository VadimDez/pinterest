'use strict';

angular.module('pinterestApp.auth', [
  'pinterestApp.constants',
  'pinterestApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
