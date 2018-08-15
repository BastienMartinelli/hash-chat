import * as React from "react";
import { observer, inject } from "mobx-react";
import { ChatStore } from "../model/ChatStore";
import { UserStore } from "../model/UserStore";
import { IMessage } from "../model/Message";
import Message from "./Message";
import MessageInput from "./MessageInput";

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
        <MessageInput />
      </React.Fragment>
    );
  }

  /**
   * Calculate the opacity attribute of a message based on his date of creation
   */
  private getVisibility = (createdAt: any): number => {
    const time: number = Date.now() - new Date(createdAt).getTime();
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
    return (
      this.props
        // filter the old messages
        .chatStore!.visibleMessages.filter(
          msg => this.getVisibility(msg.createdAt || Date.now()) > 0
        )
        // Generate message component
        .map((msg: IMessage) => {
          return (
            <Message
              admin={msg.admin}
              author={msg.author}
              content={msg.content}
              key={msg.id}
              self={msg.author === this.props.userStore!.userName}
              visibility={this.getVisibility(msg.createdAt) || 1}
            />
          );
        })
    );
  }
}

export default MessagesContainer;
