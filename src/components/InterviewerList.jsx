import React from "react";
import classnames from "classnames";
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";

export default function InterviewerList(props) {
  const eachInterviewer = props.interviewers.map((interviewer) => (
    <InterviewerListItem
      key={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected={interviewer.id === props.value}
      setInterviewer={ () => props.onChange(interviewer.id)}
    />
  ));

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{eachInterviewer}</ul>
    </section>
  );
}