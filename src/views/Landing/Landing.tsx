import * as React from "react";
import { observer, inject } from "../../../node_modules/mobx-react";
import { UserStore } from "../../model/UserStore";
import { Animated } from "../../../node_modules/react-animated-css";
import { HashtagStore } from "../../model/HashtagStore";
import { JoinChanel } from "../../components/JoinChanel";
import { Auth } from "../../components/Auth";
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
                <div className="box">
                  <span>Please sign in to start chatting:</span>
                  <JoinChanel
                    hashtags={this.props.hashtagStore!.hashtags}
                    clearHashtags={this.props.hashtagStore!.clearHashtags}
                  />
                  <Auth onAuthSuccessfull={this.onAuth} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </Animated>
    );
  }

  private onAuth = (data: any) => {
    this.props.userStore!.userName = data.user.displayName || data.user.email;
  };
}

export default Landing;
