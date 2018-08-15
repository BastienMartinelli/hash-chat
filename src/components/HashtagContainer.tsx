import * as React from "react";
import { observer, inject } from "../../node_modules/mobx-react";
import { HashtagStore } from "../model/HashtagStore";
import { Hashtag } from "./Hashtag";
import HashtagShare from "./HashtagShare";

interface IProps {
  hashtagStore?: HashtagStore;
}

interface IState {
  input: string;
}

@inject("hashtagStore")
@observer
class HashtagContainer extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      input: ""
    };
  }

  public render() {
    return (
      <div className="hashtag-container">
        <form onSubmit={this.addHashtag}>
          <input
            className="input is-rounded"
            type="text"
            placeholder="Add an hashtag. e.g. #NewSubject"
            value={this.state.input}
            onChange={this.onChange}
            disabled={this.isDisabled()}
          />
        </form>
        <div>
          {this.props.hashtagStore!.hashtags.map((tag: string) => (
            <Hashtag
              hashtag={tag}
              delete={this.props.hashtagStore!.deleteHashtag}
              key={Math.random()}
            />
          ))}
          {!!this.props.hashtagStore!.hashtags.length && (
            <span>
              <a
                className="tag is-primary is-medium is-rounded hashtag"
                onClick={this.props.hashtagStore!.clearHashtags}
              >
                Clear all tags
              </a>
            </span>
          )}
          <HashtagShare hashtags={this.props.hashtagStore!.hashtags} />
        </div>
      </div>
    );
  }

  private onChange = (e: any) => {
    this.setState({
      input: e.target.value
    });
  };

  private addHashtag = (e: any) => {
    e.preventDefault();

    if (/^#\w+$/.test(this.state.input)) {
      this.props.hashtagStore!.addHashtag(this.state.input);
      this.setState({
        input: ""
      });
    }
  };

  private isDisabled(): boolean {
    return this.props.hashtagStore!.hashtags.length === 3;
  }
}

export default HashtagContainer;
