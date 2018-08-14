import * as React from "react";
import { observer, inject } from "mobx-react";
import "./App.css";
import { ChatRoom } from "./views/ChatRoom/ChatRoom";
import Landing from "./views/Landing/Landing";
import { UserStore } from "./model/UserStore";

interface IProps {
  userStore?: UserStore;
}

@inject("userStore")
@observer
class App extends React.Component<IProps> {
  public render() {
    return (
      <div className="App">
        {this.props.userStore!.userName ? <ChatRoom /> : <Landing />}
      </div>
    );
  }
}

export default App;
