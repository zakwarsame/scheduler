import React, { useEffect } from "react";
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
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  // show current status of an appointments slot based on users activity
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // function for saving an appointment on both client and server side
  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    bookInterview(id, interview)
      .then(() => transition(SHOW))
      .catch((error) => {
        transition(ERROR_SAVE, true);
        console.log(error);
      });
  };

  // function for deleting an appointment on both client and server side
  const destroyAppointment = () => {
    transition(DELETING, true);
    cancelInterview(id)
      .then(() => transition(EMPTY))
      .catch((error) => {
        console.log(error);
        transition(ERROR_DELETE, true);
      });
  };

  // update the transition based on interview and mode - used for avoiding TypeError during websocket connection
  useEffect(() => {
    (interview && mode === EMPTY) && transition(SHOW);
    (!interview && mode === SHOW) && transition(EMPTY);
  }, [interview, transition, mode]);

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
      {mode === SHOW && interview && (
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
          onConfirm={destroyAppointment}
        />
      )}
      {mode === DELETING && <Status message="Deleting..." />}
      {mode === ERROR_SAVE && <Error message="Unable to save" onClose={back} />}
      {mode === ERROR_DELETE && (
        <Error message="Unable to delete" onClose={back} />
      )}
    </article>
  );
}
