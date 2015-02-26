var Store = require("./stores/Store");
var FileTree = require("./components/FileTree");
var Toolbar = require("./components/Toolbar");

window.onload = function() {
  React.render(
    <div>
      <FileTree filekey="local" icon="display" />
      <Toolbar />
      <FileTree filekey="remote" icon="android" />
    </div>,
    document.getElementById('frame')
  );
};

