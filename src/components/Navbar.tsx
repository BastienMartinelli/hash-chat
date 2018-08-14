import * as React from "react";
import { observer, inject } from "../../node_modules/mobx-react";
import { UserStore } from "../model/UserStore";

interface IProps {
  userStore?: UserStore;
}

interface IState {
  input: string;
}

@inject("userStore")
@observer
class Navbar extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      input: ""
    };
  }

  public render() {
    return (
      <nav
        className="navbar is-primary"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <a className="navbar-item">Hash-Chat</a>
        </div>
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="field is-grouped">
              <p className="control">
                <a className="bd-tw-button button is-info" onClick={this.exit}>
                  <span>Exit</span>
                </a>
              </p>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  private exit = () => {
    this.props.userStore!.userName = "";
  };
}

export default Navbar;
