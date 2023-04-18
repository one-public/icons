import type { Component } from "solid-js";
import Search from "./component/Search";
import IconList from "./component/IconList";
import Dialog from "./component/Dialog";

const App: Component = () => {
  return (
    <div>
      <Search></Search>
      <IconList></IconList>
      <Dialog></Dialog>
    </div>
  );
};

export default App;
