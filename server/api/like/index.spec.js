'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var likeCtrlStub = {
  index: 'likeCtrl.index',
  show: 'likeCtrl.show',
  create: 'likeCtrl.create',
  update: 'likeCtrl.update',
  destroy: 'likeCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var likeIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './like.controller': likeCtrlStub
});

describe('Like API Router:', function() {

  it('should return an express router instance', function() {
    likeIndex.should.equal(routerStub);
  });

  describe('GET /api/likes', function() {

    it('should route to like.controller.index', function() {
      routerStub.get
        .withArgs('/', 'likeCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/likes/:id', function() {

    it('should route to like.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'likeCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/likes', function() {

    it('should route to like.controller.create', function() {
      routerStub.post
        .withArgs('/', 'likeCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/likes/:id', function() {

    it('should route to like.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'likeCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/likes/:id', function() {

    it('should route to like.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'likeCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/likes/:id', function() {

    it('should route to like.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'likeCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
