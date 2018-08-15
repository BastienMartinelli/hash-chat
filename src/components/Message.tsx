import * as React from "react";
import { Animated } from "react-animated-css";

interface IProps {
  author: string;
  content: string;
  self?: boolean;
  admin: boolean;
  visibility: number;
}

export const Message: React.SFC<IProps> = (props: IProps) => {
  let msgColor = props.self ? "message is-primary" : "message is-info";

  if (props.admin) {
    msgColor = "message is-warning";
  }

  return (
    <Animated
      animationIn="bounceInLeft"
      animationOut="fadeOut"
      isVisible={true}
    >
      <div className="message-content" style={{ opacity: props.visibility }}>
        <b>{props.author}</b>
        <article className={msgColor}>
          <div className="message-body">{props.content}</div>
        </article>
      </div>
    </Animated>
  );
};

export default Message;
