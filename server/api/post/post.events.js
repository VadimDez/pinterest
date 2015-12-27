/**
 * Post model events
 */

'use strict';

import {EventEmitter} from 'events';
var Post = require('../../sqldb').Post;
var PostEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
PostEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Post.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    PostEvents.emit(event + ':' + doc._id, doc);
    PostEvents.emit(event, doc);
    done(null);
  }
}

export default PostEvents;
