/**
 * Thing model events
 */

'use strict';

import {EventEmitter} from 'events';
var Thing = require('../../sqldb').Thing;
var ThingEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ThingEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Thing.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    ThingEvents.emit(event + ':' + doc._id, doc);
    ThingEvents.emit(event, doc);
    done(null);
  }
}

export default ThingEvents;
