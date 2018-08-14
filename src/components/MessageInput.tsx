import * as React from "react";
import { ChatStore } from "../model/ChatStore";
import { observer, inject } from "mobx-react";

interface IProps {
  chatStore?: ChatStore;
}

interface IState {
  msg: string;
}

@inject("chatStore")
@observer
class MessageInput extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      msg: ""
    };
  }

  public render() {
    return (
      <div className="message-input">
        <form onSubmit={this.onSubmit}>
          <input
            onChange={this.onChange}
            className="input is-rounded"
            type="text"
            placeholder="New Message"
            value={this.state.msg}
          />
        </form>
      </div>
    );
  }
  private onChange = (e: any) => {
    this.setState({
      msg: e.target.value
    });
  };

  private onSubmit = (e: any) => {
    e.preventDefault();
    this.props.chatStore!.publishMessage(this.state.msg).then(() => {
      this.setState({
        msg: ""
      });
    });
  };
}

export default MessageInput;
