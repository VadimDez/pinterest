'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var postCtrlStub = {
  index: 'postCtrl.index',
  show: 'postCtrl.show',
  create: 'postCtrl.create',
  update: 'postCtrl.update',
  destroy: 'postCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var postIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './post.controller': postCtrlStub
});

describe('Post API Router:', function() {

  it('should return an express router instance', function() {
    postIndex.should.equal(routerStub);
  });

  describe('GET /api/posts', function() {

    it('should route to post.controller.index', function() {
      routerStub.get
        .withArgs('/', 'postCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/posts/:id', function() {

    it('should route to post.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'postCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/posts', function() {

    it('should route to post.controller.create', function() {
      routerStub.post
        .withArgs('/', 'postCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/posts/:id', function() {

    it('should route to post.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'postCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/posts/:id', function() {

    it('should route to post.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'postCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/posts/:id', function() {

    it('should route to post.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'postCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
