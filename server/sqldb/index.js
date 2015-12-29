/**
 * Sequelize initialization module
 */

'use strict';

import path from 'path';
import config from '../config/environment';
import Sequelize from 'sequelize';

var db = {
  Sequelize,
  sequelize: new Sequelize(config.sequelize.uri, config.sequelize.options)
};

// Insert models below
db.Like = db.sequelize.import('../api/like/like.model');
db.Post = db.sequelize.import('../api/post/post.model');
db.User = db.sequelize.import('../api/user/user.model');

// relations
db.User.hasMany(db.Post);
db.Post.belongsTo(db.User, {
  onDelete: "CASCADE",
  foreignKey: {
    allowNull: false
  }
});

db.User.hasMany(db.Like);
db.Like.belongsTo(db.User, {
  onDelete: "CASCADE",
  foreignKey: {
    allowNull: false
  }
});
db.Post.hasMany(db.Like);
db.Like.belongsTo(db.Post, {
  onDelete: "CASCADE",
  foreignKey: {
    allowNull: false
  }
});


export default db;
