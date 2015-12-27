'use strict';

class postService {
  constructor($http) {
    this.$http = $http;
  }

  get() {
    return this.$http.get('/api/posts');
  }

  filter(filter) {
    return this.$http({
      mathod: 'GET',
      url: '/api/posts',
      params: filter
    });
  }

  create(post) {
    return this.$http.post('/api/posts', post);
  }

  like(post) {
    return this.$http.post(`/api/posts/${post._id}/like`);
  }

  dislike(post) {
    return this.$http.delete(`/api/posts/${post._id}/like`);
  }

  remove(post) {
    return this.$http.delete(`/api/posts/${post._id}`);
  }
}

angular.module('pinterestApp')
  .service('postService', postService);
