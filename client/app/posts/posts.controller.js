'use strict';

class PostsCtrl {
  constructor(postService, Auth) {
    this.postService = postService;
    this.posts = [];
    this.currentUser = {};

    postService.get()
      .then(data => {
        this.posts = data.data;
      });

    Auth.getCurrentUser((user => {
      this.currentUser = user;
    }));
  }

  removeCb(post) {
    this.posts.splice(this.posts.indexOf(post), 1);
  }

  updateCb(post, data) {
    this.posts[this.posts.indexOf(post)] = data;
  }
}

angular.module('pinterestApp')
  .controller('PostsCtrl', PostsCtrl);
