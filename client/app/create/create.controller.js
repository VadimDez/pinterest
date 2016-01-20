'use strict';

class CreateCtrl {
  constructor(postService, $state, Auth) {
    this.postService = postService;
    this.post = {};
    this.$state = $state;

    Auth.getCurrentUser(user => {
      this.currentUser = user;
      this.post.User = user;
    });
  }

  create() {
    this.postService.create(this.post)
      .then(data => {
        this.$state.go('wall', {id: this.currentUser._id});
      });
  }
}

angular.module('pinterestApp')
  .controller('CreateCtrl', CreateCtrl);
