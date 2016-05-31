/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import sqldb from '../sqldb';
var User = sqldb.User;
var Post = sqldb.Post;

User.sync()
  .then(() => {
    User.find({
      email: 'test@test.com'
    }).then(user => {

      if (user) {
        return;
      }

      User.create({
        provider: 'local',
        name: 'Test',
        email: 'test@test.com',
        password: 'test'
      }).then(user => {

        Post.bulkCreate([{
          UserId: user.dataValues._id,
          created_at: 1451383620000,
          description: 'pizza',
          image: 'https://s-media-cache-ak0.pinimg.com/736x/7d/4c/ea/7d4cea99d73d2ea82549de0ea4b80198.jpg'
        }, {
          UserId: user.dataValues._id,
          created_at: 1451383740000,
          description: 'Italy',
          image: 'https://s-media-cache-ak0.pinimg.com/236x/91/52/70/915270eceea827bd83d2d83d84bbc407.jpg'
        }, {
          UserId: user.dataValues._id,
          created_at: 1451383860000,
          description: 'Drift',
          image: 'https://s-media-cache-ak0.pinimg.com/236x/a8/ea/7c/a8ea7ca66dbf42ae3f8b85090f87e648.jpg'
        }, {
          UserId: user.dataValues._id,
          created_at: 1451384040000,
          description: 'Drift',
          image: 'https://s-media-cache-ak0.pinimg.com/236x/17/d9/15/17d91548081555c72e2c3b01916e2f53.jpg'
        }, {
          UserId: user.dataValues._id,
          created_at: 1451384040000,
          description: 'Racing',
          image: 'https://s-media-cache-ak0.pinimg.com/236x/f2/05/46/f20546f08fa5ffad0fb48b06883ee94b.jpg'
        }]);

        console.log('finished populating test');
      })
    });

    User.find({
      email: 'vadym@vadym.com'
    }).then(user => {
      if (user) {
        return;
      }

      User.create({
        provider: 'local',
        role: 'admin',
        name: 'Vadym',
        email: 'vadym@vadym.com',
        password: 'superpassword123'
      }).then(user => {


        Post.bulkCreate([{
          UserId: user.dataValues._id,
          created_at: 1451383680000,
          description: 'BMW',
          image: 'https://s-media-cache-ak0.pinimg.com/236x/96/c4/f3/96c4f37487839b0482893449e2cdede6.jpg'
        }, {
          UserId: user.dataValues._id,
          created_at: 1451383800000,
          description: 'Lamborghini Aventador',
          image: 'https://s-media-cache-ak0.pinimg.com/236x/ed/61/aa/ed61aa213c6ebccb0c3eb8d67481f17e.jpg'
        }, {
          UserId: user.dataValues._id,
          created_at: 1451383920000,
          description: 'Lancer',
          image: 'https://s-media-cache-ak0.pinimg.com/236x/9a/7b/52/9a7b52d4027e273a32bd9c49b55e2306.jpg'
        }, {
          UserId: user.dataValues._id,
          created_at: 1451383980000,
          description: 'Nissan Silvia',
          image: 'https://s-media-cache-ak0.pinimg.com/236x/e7/ae/0e/e7ae0e1bc42dbaaa4866f7ee7a139d5a.jpg'
        }, {
          UserId: user.dataValues._id,
          created_at: 1451383980000,
          description: 'Car',
          image: 'https://s-media-cache-ak0.pinimg.com/236x/f1/c4/2c/f1c42c038ddcc8e3617342c47f3cc3bd.jpg'
        }]);


        console.log('finished populating user vadym');
      });
    });


    User.find({
      email: 'test@example.com'
    }).then(user => {
      if (user) {
        return;
      }

      User.create({
        provider: 'local',
        role: 'user',
        name: 'Test',
        email: 'test@example.com',
        password: 'test'
      });
    });
  });
