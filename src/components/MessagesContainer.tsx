import * as React from "react";
import { observer, inject } from "mobx-react";
import { ChatStore } from "../model/ChatStore";
import { UserStore } from "../model/UserStore";
import { IMessage } from "../model/Message";
import Message from "./Message";
import MessageInput from "./MessageInput";

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

  private scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  };

  private getMessages() {
    return this.props.chatStore!.visibleMessages.map((msg: IMessage) => {
      return (
        <Message
          admin={msg.admin}
          key={msg.id}
          author={msg.author}
          content={msg.content}
          self={msg.author === this.props.userStore!.userName}
          createdAt={msg.createdAt}
        />
      );
    });
  }
}

export default MessagesContainer;
