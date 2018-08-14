import * as React from "react";
import { Animated } from "react-animated-css";

interface IProps {
  author: string;
  content: string;
  self?: boolean;
  admin: boolean;
  createdAt?: Date;
}

const HOUR_IN_MILLI: number = 3600000;
const VISIBLE_TIME: number = 12;

const getVisibility = (createdAt: any): number => {
  const time: number = Date.now() - new Date(createdAt).getTime();
  const hours: number = time / HOUR_IN_MILLI;
  return 1 - hours / VISIBLE_TIME;
};

export const Message: React.SFC<IProps> = (props: IProps) => {
  let msgColor = props.self ? "message is-primary" : "message is-info";

  if (props.admin) {
    msgColor = "message is-warning";
  }

  return (
    <div>
      {getVisibility(props.createdAt) > 0 && (
        <Animated
          animationIn="bounceInLeft"
          animationOut="fadeOut"
          isVisible={true}
        >
          <div
            className="message-content"
            style={{ opacity: getVisibility(props.createdAt) || 1 }}
          >
            <b>{props.author}</b>
            <article className={msgColor}>
              <div className="message-body">{props.content}</div>
            </article>
          </div>
        </Animated>
      )}
    </div>
  );
};

export default Message;
