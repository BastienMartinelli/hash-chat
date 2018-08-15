import * as React from "react";
import { Animated } from "react-animated-css";

interface IProps {
  show: boolean;
  onClose: () => void;
  url: string;
}

export const ShareModale: React.SFC<IProps> = (props: IProps) => {
  return props.show ? (
    <div className="modal is-active">
      <div className="modal-background" onClick={props.onClose} />
      <Animated animationIn="bounceIn" animationOut="fadeOut" isVisible={true}>
        <div className="modal-content">
          <div className="control">
            <input
              className="input"
              type="text"
              value={props.url}
              readOnly={true}
            />
          </div>
        </div>
      </Animated>
    </div>
  ) : (
    <div />
  );
};

export default ShareModale;
