'use strict';

class PostDirectiveCtrl {
  constructor(Auth, postService) {
    this.postService = postService;

    Auth.getCurrentUser((user => {
      this.currentUser = user;
    }));
  }

  /**
   * remove post
   */
  remove() {
    this.postService.remove(this.post)
      .then(() => {
        this.removeCb({post: this.post});
      });
  }

  /**
   * Like / undo like
   */
  like() {
    this.combinedFunction()
      .then(data => {
        this.post = data.data;
      });
  }

  combinedFunction() {
    if (this.post.Likes.length) {
      return this.postService.dislike(this.post);
    }

    return this.postService.like(this.post);
  }
}

angular.module('pinterestApp')
  .directive('post', function () {
    return {
      scope: {
        post: '=',
        removeCb: '&'
      },
      restrict: 'E',
      templateUrl: 'components/post/post/post.html',
      controller: PostDirectiveCtrl,
      controllerAs: 'postDirCtrl',
      bindToController: true
    };
  });
