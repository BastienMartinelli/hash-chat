import * as React from "react";
import { observer, inject } from "../../../node_modules/mobx-react";
import { UserStore } from "../../model/UserStore";
import { Animated } from "../../../node_modules/react-animated-css";
import { HashtagStore } from "../../model/HashtagStore";
import { JoinChanel } from "../../components/JoinChanel";
import hashLogo from "../../img/hash-logo.png";

interface IProps {
  userStore?: UserStore;
  hashtagStore?: HashtagStore;
}

interface IState {
  userName: string;
}

@inject("userStore", "hashtagStore")
@observer
class Landing extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      userName: ""
    };
  }

  public render() {
    return (
      <Animated
        style={{ height: 100 }}
        animationIn="bounceInLeft"
        animationOut="fadeOut"
        isVisible={true}
      >
        <section className="hero is-primary is-fullheight">
          <div className="hero-body">
            <div className="container has-text-centered">
              <div className="column is-6 is-offset-3">
                <img width="50px" src={hashLogo} />
                <h1 className="title">#Hash-Chat</h1>
                <h2 className="subtitle">
                  A subject oriented public chat application.
                </h2>
                <JoinChanel
                  hashtags={this.props.hashtagStore!.hashtags}
                  clearHashtags={this.props.hashtagStore!.clearHashtags}
                />
                <div className="box">
                  <form onSubmit={this.onSubmit}>
                    <div className="field is-grouped">
                      <p className="control is-expanded">
                        <input
                          className="input"
                          type="text"
                          placeholder="Choose a username"
                          value={this.state.userName}
                          onChange={this.onChange}
                        />
                      </p>
                      <p className="control">
                        <button className="button is-info" type="submit">
                          Start To Chat
                        </button>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Animated>
    );
  }

  private onChange = (e: any) => {
    this.setState({
      userName: e.target.value
    });
  };

  private onSubmit = (e: any) => {
    e.preventDefault();
    if (this.state.userName.trim()) {
      this.props.userStore!.userName = this.state.userName;
    }
  };
}

export default Landing;
