var AppDispatcher = require("../dispatchers/AppDispatcher");
var Constants = require("../constants/Constants");

var Store = module.exports = (function() {
  var changeCallbacks = [];

  return {
    emitChange: function() {
      for (var i = 0; i < changeCallbacks.length; i++) {
        changeCallbacks[i]();
      }
    },
    addChangeListener: function(callback) {
      changeCallbacks.push(callback);
    },
    removeChangeListener: function(callback) {
      changeCallbacks.splice(changeCallbacks.indexOf(callback), 1);
    },
    getFileTreeState: function(filekey) {
      return states[filekey] || {};
    },
    getAllPins: function() {
      return _pins;
    },
    getPinListState: function() {
      return { currentPin: currentPin, show: showModals };
    },
    newPost: function(post) {
      post.id = Math.random();
      _pins.push(post);
    },
    setPins: function(data) {
      _pins = data;
    }
  };
})();


// Register callback to handle all updates
AppDispatcher.register(function(action) {
  var text;
  var state = states[action.filekey];

  if (!state) {
    state = (states[action.filekey] = {});
  }

  switch(action.actionType) {
    case Constants.SELECT_FILE:
      state.selectedItem = action.file.id;
      Store.emitChange();
      break;
    default:
      // no op
  }
});

var files = {
  "local": [
    { "name": "butts" },
    { "name": "butts" },
    { "name": "butts" },
    { "name": "butts" },
    { "name": "butts" },
    { "name": "butts" },
    { "name": "butts" },
    { "name": "butts" },
    { "name": "butts.jpg"}
  ],
  "remote": [
    { "name": "..", directory: true },
    { "name": ".", directory: true},
    { "name": "DCIM", directory: true},
    { "name": "Camera", directory: true},
    { "name": "Music", directory: true},
    { "name": "Chicken.txt"},
  ]
};
for (var i = 0; i < files["local"].length; i++) {
  files["local"][i].id = i;
}
for (var i = 0; i < files["remote"].length; i++) {
  files["remote"][i].id = i;
}
var states = {
};
module.exports.getFiles = function(key) {
  return files[key];
};

