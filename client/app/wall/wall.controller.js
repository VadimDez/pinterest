'use strict';
class WallCtrl {
  constructor(postService, $state) {
    this.posts = [];

    postService.filter({UserId: $state.params.id})
      .then(data => {
        this.posts = data.data;
      });
  }

  removeCb(post) {
    this.posts.splice(this.posts.indexOf(post), 1);
  }

  updateCb(post, data) {
    this.posts[this.posts.indexOf(post)] = data;
  }
}
angular.module('pinterestApp')
  .controller('WallCtrl', WallCtrl);
