import * as React from "react";

interface IProps {
  delete: (hashtag: string) => void;
  hashtag: string;
}

export const Hashtag: React.SFC<IProps> = (props: IProps) => {
  return (
    <span className="tag is-info is-medium is-rounded hashtag">
      {props.hashtag}
      <button
        className="delete is-small"
        onClick={() => {
          props.delete(props.hashtag);
        }}
      />
    </span>
  );
};

export default Hashtag;
