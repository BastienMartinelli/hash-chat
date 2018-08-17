import * as React from "react";
import { HashtagStore } from "../model/HashtagStore";
import { observer, inject } from "../../node_modules/mobx-react";

interface IProps {
  hashtagStore?: HashtagStore;
  onClick: () => void;
}

@inject("hashtagStore")
@observer
class HashtagHistory extends React.Component<IProps> {
  public render() {
    const { history } = this.props.hashtagStore!;

    return (
      history &&
      !!history.length && (
        <React.Fragment>
          <div className="navbar-item">
            <span className="icon">
              <i className="fas fa-history" />
            </span>
            <span>History :</span>
          </div>
          {history &&
            history.map((item: string[]) => (
              <a className="navbar-item" onClick={this.changeChanel(item)}>
                <span>{item.join(" ")}</span>
              </a>
            ))}
        </React.Fragment>
      )
    );
  }

  private changeChanel = (chanel: string[]) => () => {
    this.props.onClick();
    this.props.hashtagStore!.changeChanel(chanel);
  };
}

export default HashtagHistory;
