import * as React from "react";
import { observer, inject } from "../../node_modules/mobx-react";
import { UserStore } from "../model/UserStore";
import hashLogo from "../img/hash-logo.png";
import HashtagHistory from "./HashtagHistory";

interface IProps {
  userStore?: UserStore;
}

interface IState {
  input: string;
  showMenu: boolean;
}

@inject("userStore")
@observer
class Navbar extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      input: "",
      showMenu: false
    };
  }

  public render() {
    const menu = this.state.showMenu ? "navbar-menu is-active" : "navbar-menu";
    return (
      <nav
        className="navbar is-primary"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="container">
          <div className="navbar-brand">
            <a className="navbar-item">
              <img src={hashLogo} width="30px" />
            </a>
            <a
              role="button"
              className="navbar-burger"
              aria-label="menu"
              aria-expanded="false"
              onClick={this.onShowMenu}
            >
              <span aria-hidden="true" />
              <span aria-hidden="true" />
              <span aria-hidden="true" />
            </a>
          </div>
          <div className={menu}>
            <div className="navbar-end">
              <div className="navbar-item has-dropdown is-hoverable">
                <a className="navbar-link">
                  <span className="icon">
                    <i className="fas fa-user" />
                  </span>
                  <span>{this.props.userStore!.userName}</span>
                </a>

                <div className="navbar-dropdown is-light">
                  <a className="navbar-item" onClick={this.exit}>
                    <span className="icon">
                      <i className="fas fa-sign-out-alt" />
                    </span>
                    <span> Exit Chat</span>
                  </a>
                  <a className="navbar-item">
                    <span className="icon">
                      <i className="fas fa-pen" />
                    </span>
                    <span>Change username</span>
                  </a>
                  <hr className="dropdown-divider" />
                  <HashtagHistory />
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  private onShowMenu = () => {
    this.setState(prev => ({
      showMenu: !prev.showMenu
    }));
  };

  private exit = () => {
    this.props.userStore!.userName = "";
  };
}

export default Navbar;
