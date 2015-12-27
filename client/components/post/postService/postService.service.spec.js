'use strict';

describe('Service: postService', function () {

  // load the service's module
  beforeEach(module('pinterestApp'));

  // instantiate service
  var postService;
  beforeEach(inject(function (_postService_) {
    postService = _postService_;
  }));

  it('should do something', function () {
    expect(!!postService).toBe(true);
  });

});
