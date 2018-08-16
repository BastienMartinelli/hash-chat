import * as React from "react";

interface IProps {
  hashtags?: string[];
  clearHashtags: () => void;
}

export const JoinChanel: React.SFC<IProps> = (props: IProps) => {
  return props.hashtags && !!props.hashtags.length ? (
    <article className="message is-info">
      <div className="message-body">
        Ready to join <strong>{props.hashtags.join(" ")}</strong>
        <a
          className="button is-info is-fullwidth"
          onClick={props.clearHashtags}
        >
          No thanks
        </a>
      </div>
    </article>
  ) : (
    <div />
  );
};

export default JoinChanel;
