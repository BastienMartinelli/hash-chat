import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "mobx-react";
import "bulma/css/bulma.css";
import "animate.css";

import App from "./App";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import ChatStore from "./model/ChatStore";
import HashtagStore from "./model/HashtagStore";
import UserStore from "./model/UserStore";

ReactDOM.render(
  <Provider
    hashtagStore={HashtagStore}
    chatStore={ChatStore}
    userStore={UserStore}
  >
    <App />
  </Provider>,
  document.getElementById("root") as HTMLElement
);
registerServiceWorker();
