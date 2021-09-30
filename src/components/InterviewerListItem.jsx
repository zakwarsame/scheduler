import React from "react";
import "components/InterviewerListItem.scss";
import classnames from "classnames";

export default function InterviewerListItem(props) {

  const { id, selected, avatar, setInterviewer, name } = props;
  const interviewClass = classnames("interviewers__item", {
    "interviewers__item-image": avatar,
    "interviewers__item--selected": selected
  })
  return (
    <li onClick={setInterviewer} className={interviewClass}>
      <img
        className="interviewers__item-image"
        src={avatar}
        alt={name}
      />
      {selected && name}
    </li>
  );
}
