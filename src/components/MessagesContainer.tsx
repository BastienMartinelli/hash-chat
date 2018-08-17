import * as React from "react";
import { observer, inject } from "mobx-react";
import { ChatStore } from "../model/ChatStore";
import { UserStore } from "../model/UserStore";
import { IMessage } from "../model/Message";
import Message from "./Message";

const HOUR_IN_MILLI: number = 3_600_000;
const VISIBLE_TIME: number = 12;

interface IProps {
  chatStore?: ChatStore;
  userStore?: UserStore;
}

@inject("chatStore", "userStore")
@observer
class MessagesContainer extends React.Component<IProps> {
  private messagesEnd: any;

  public componentDidMount() {
    this.props.chatStore!.defineRef();
    this.scrollToBottom();
  }

  public componentDidUpdate() {
    this.scrollToBottom();
  }

  public render() {
    return (
      <React.Fragment>
        <div className="messages-container">
          {this.getMessages()}
          <div
            style={{ float: "left", clear: "both" }}
            ref={el => {
              this.messagesEnd = el;
            }}
          />
        </div>
      </React.Fragment>
    );
  }

  /**
   * Calculate the opacity attribute of a message based on his date of creation
   */
  private getVisibility = (timestamp: any): number => {
    const time: number = Date.now() - timestamp;
    const hours: number = time / HOUR_IN_MILLI;
    return 1 - hours / VISIBLE_TIME;
  };

  /**
   * Set the container scroll to the last message
   */
  private scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  };

  /**
   * Return a list of Messages component to render
   */
  private getMessages() {
    const { visibleMessages } = this.props.chatStore!;
    return (
      // filter the old messages
      visibleMessages
        .filter(msg => this.getVisibility(msg.timestamp || Date.now()) > 0)
        // Generate message component
        .map((msg: IMessage) => {
          return (
            <Message
              admin={msg.admin}
              author={msg.author}
              content={msg.content}
              date={new Date(msg.timestamp).toLocaleTimeString()}
              key={msg.id}
              self={msg.author === this.props.userStore!.userName}
              visibility={this.getVisibility(msg.timestamp) || 1}
            />
          );
        })
    );
  }
}

export default MessagesContainer;
