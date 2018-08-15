import * as React from "react";
import { ShareModale } from "./ShareModal";

interface IProps {
  hashtags: string[];
}

interface IState {
  showModal: boolean;
}

class HashtagShare extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      showModal: false
    };
  }

  public render() {
    return (
      <span>
        {!!this.props.hashtags.length && (
          <a
            className="tag is-primary is-medium is-rounded hashtag"
            onClick={this.showUrl}
          >
            Share this chanel
          </a>
        )}
        <ShareModale
          show={!!this.state.showModal}
          onClose={this.hideUrl}
          url={window.location.href}
        />
      </span>
    );
  }

  private showUrl = () => {
    this.setState({
      showModal: true
    });
  };

  private hideUrl = () => {
    this.setState({
      showModal: false
    });
  };
}

export default HashtagShare;
