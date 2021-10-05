import React, { Fragment } from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {
  const { id, time, interviewers, interview, bookInterview, cancelInterview } =
    props;

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    bookInterview(id, interview).then(() => transition(SHOW));
  };

  const deleteAppointment = () => {
    transition(DELETING);
    cancelInterview(id).then(() => transition(EMPTY));
  };

  // console.log(props);
  // console.log(mode);
  return (
    <article className="appointment">
      <Header time={time} />
      {mode === CREATE && (
        <Form
          interviewers={interviewers}
          onSave={save}
          onCancel={() => back(EMPTY)}
        />
      )}
      {mode === EDIT && (
        <Form
          name={interview.student}
          interviewers={interviewers}
          onSave={save}
          onCancel={() => back(EMPTY)}
          interviewer={interview.interviewer.id}
        />
      )}
      {mode === SAVING && <Status message="Saving..." />}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CONFIRM && (
        <Confirm
          message="Are you sure you would like to delete?"
          onCancel={() => back(EMPTY)}
          onConfirm={deleteAppointment}
        />
      )}
      {mode === DELETING && <Status message="Deleting..." />}
    </article>
  );
}
