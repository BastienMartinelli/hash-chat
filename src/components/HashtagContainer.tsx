import * as React from "react";
import { observer, inject } from "../../node_modules/mobx-react";
import { HashtagStore } from "../model/HashtagStore";
import { Hashtag } from "./Hashtag";
import HashtagShare from "./HashtagShare";

const HASHTAG_MAX_LENGTH = 50;

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
    const { hashtags, deleteHashtag, clearHashtags } = this.props.hashtagStore!;

    return (
      <div className="hashtag-container shadow">
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
        <div className="tag-container">
          {hashtags.map((tag: string) => (
            <Hashtag hashtag={tag} delete={deleteHashtag} key={Math.random()} />
          ))}
          {!!hashtags.length && (
            <span>
              <a
                className="tag is-primary is-medium is-rounded hashtag"
                onClick={clearHashtags}
              >
                <span className="icon">
                  <i className="fas fa-eraser" />
                </span>
                <span>Clear</span>
              </a>
            </span>
          )}
          <HashtagShare hashtags={hashtags} />
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
    const input: string = this.state.input;
    if (/^#\w+$/.test(input) && input.length <= HASHTAG_MAX_LENGTH) {
      this.props.hashtagStore!.addHashtag(input);
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
