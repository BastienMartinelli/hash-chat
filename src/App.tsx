import * as React from "react";
import { observer, inject, Provider } from "mobx-react";
import "./App.css";
import { ChatRoom } from "./views/ChatRoom/ChatRoom";
import Landing from "./views/Landing/Landing";
import userStore, { UserStore } from "./model/UserStore";
import hashtagStore from "./model/HashtagStore";
import chatStore from "./model/ChatStore";

interface IProps {
  userStore?: UserStore;
}

/**
 * Component that switch between the landing viw and the
 * chat room based on wherever a user name exist
 */
@inject("userStore")
@observer
class SwitchView extends React.Component<IProps> {
  public render() {
    return this.props.userStore!.userName ? <ChatRoom /> : <Landing />;
  }
}

/**
 * App component
 */
const App = () => {
  return (
    <Provider
      hashtagStore={hashtagStore}
      chatStore={chatStore}
      userStore={userStore}
    >
      <div className="App">
        <SwitchView />
      </div>
    </Provider>
  );
};

export default App;
