'use strict';

var express = require('express');
var controller = require('./post.controller');
import * as auth from '../../auth/auth.service';

var router = express.Router();

router.get('/', auth.attachUser(), controller.index);
router.get('/:id', controller.show);
router.post('/', auth.isAuthenticated(), controller.create);
router.post('/:id/like', auth.isAuthenticated(), controller.like);
router.delete('/:id/like', auth.isAuthenticated(), controller.dislike);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
