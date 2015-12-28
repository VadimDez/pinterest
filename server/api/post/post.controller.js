/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/posts              ->  index
 * POST    /api/posts              ->  create
 * GET     /api/posts/:id          ->  show
 * PUT     /api/posts/:id          ->  update
 * DELETE  /api/posts/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
var sqldb = require('../../sqldb/index');
import Sequelize from 'sequelize';

var Post = sqldb.Post;
var Like = sqldb.Like;
var User = sqldb.User;

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    console.error(err);
    res.status(statusCode).send(err);
  };
}

function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function saveUpdates(updates) {
  return function(entity) {
    return entity.updateAttributes(updates)
      .then(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.destroy()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function getSelectQuery(user) {
  var include = [{
    model: User,
    attributes: ['_id', 'name']
  }];

  include.push({
    model: Like,
    required: false,
    where: {
      UserId: user && user._id || -1
    }
  });

  return {
    attributes: {
      include: [[
        Sequelize.literal('(SELECT COUNT("Likes"."_id") FROM "Likes" WHERE "Likes"."PostId" = "Post"."_id")'),
        'likesCount'
      ]]
    },
    include: include,
    order: [
      ['created_at', 'DESC']
    ]
  };
}

// Gets a list of Posts
export function index(req, res) {
  var filterQuery = getSelectQuery(req.user);

  // filter by user id
  if (req.query.UserId) {
    filterQuery.where = {
      UserId: req.query.UserId
    };
  }

  Post.findAll(filterQuery)
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Gets a single Post from the DB
export function show(req, res) {
  Post.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Creates a new Post in the DB
export function create(req, res) {
  var post = req.body;
  post.UserId = req.user._id;
  post.created_at = Date.now();

  Post.create(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Post in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Post.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Deletes a Post from the DB
export function destroy(req, res) {
  Post.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

export function like(req, res) {
  Like.create({
    PostId: req.params.id,
    UserId: req.user._id,
    created_at: new Date()
  })
    .then(() => {

      var query = getSelectQuery(req.user);
      query.where = {
        _id: req.params.id
      };

      Post.findOne(query)
        .then(responseWithResult(res, 201))
        .catch(handleError(res, 401));
    })
    .catch(handleError(res, 402));
}

export function dislike(req, res) {

  Like.find({
    where: {
      userId: req.user._id,
      postId: req.params.id
    }
  })
    .then(like => {
      if (!like) {
        res.status(404).end();
        return;
      }

      like.destroy()
        .then(() => {
          var query = getSelectQuery(req.user);
          query.where = {
            _id: req.params.id
          };
          Post.find(query)
            .then(responseWithResult(res))
            .catch(handleError(res));
        })
        .catch(handleError(res));
    })
    .catch(handleError(res));
}