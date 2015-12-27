/**
 * Like model events
 */

'use strict';

import {EventEmitter} from 'events';
var Like = require('../../sqldb').Like;
var LikeEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
LikeEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Like.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    LikeEvents.emit(event + ':' + doc._id, doc);
    LikeEvents.emit(event, doc);
    done(null);
  }
}

export default LikeEvents;
