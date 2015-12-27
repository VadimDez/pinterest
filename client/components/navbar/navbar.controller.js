'use strict';

class NavbarController {
  //start-non-standard
  menu = [{
    title: 'Posts',
    state: 'posts'
  }];

  isCollapsed = true;
  //end-non-standard

  constructor(Auth) {
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;
  }
}

angular.module('pinterestApp')
  .controller('NavbarController', NavbarController);
