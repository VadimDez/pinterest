'use strict';

describe('Directive: post', function () {

  // load the directive's module and view
  beforeEach(module('pinterestApp'));
  beforeEach(module('components/post/post/post.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<post></post>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the post directive');
  }));
});
