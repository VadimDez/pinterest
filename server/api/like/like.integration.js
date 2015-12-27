'use strict';

var app = require('../..');
import request from 'supertest';

var newLike;

describe('Like API:', function() {

  describe('GET /api/likes', function() {
    var likes;

    beforeEach(function(done) {
      request(app)
        .get('/api/likes')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          likes = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      likes.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/likes', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/likes')
        .send({
          name: 'New Like',
          info: 'This is the brand new like!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newLike = res.body;
          done();
        });
    });

    it('should respond with the newly created like', function() {
      newLike.name.should.equal('New Like');
      newLike.info.should.equal('This is the brand new like!!!');
    });

  });

  describe('GET /api/likes/:id', function() {
    var like;

    beforeEach(function(done) {
      request(app)
        .get('/api/likes/' + newLike._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          like = res.body;
          done();
        });
    });

    afterEach(function() {
      like = {};
    });

    it('should respond with the requested like', function() {
      like.name.should.equal('New Like');
      like.info.should.equal('This is the brand new like!!!');
    });

  });

  describe('PUT /api/likes/:id', function() {
    var updatedLike;

    beforeEach(function(done) {
      request(app)
        .put('/api/likes/' + newLike._id)
        .send({
          name: 'Updated Like',
          info: 'This is the updated like!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedLike = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedLike = {};
    });

    it('should respond with the updated like', function() {
      updatedLike.name.should.equal('Updated Like');
      updatedLike.info.should.equal('This is the updated like!!!');
    });

  });

  describe('DELETE /api/likes/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/likes/' + newLike._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when like does not exist', function(done) {
      request(app)
        .delete('/api/likes/' + newLike._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
