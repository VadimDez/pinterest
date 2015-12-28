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
}
angular.module('pinterestApp')
  .controller('WallCtrl', WallCtrl);
