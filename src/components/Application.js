import React, { useState, useEffect } from "react";
// import DayListItem from "./DayListItem";
import DayList from "./DayList";
import "components/Application.scss";
import Appointment from "./Appointment";
import axios from "axios";
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from "helpers/selectors";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });
  const appointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);

  console.log("interviewers", interviewers);
  const setDay = (day) => setState({ ...state, day });

  useEffect(() => {
    const fetchDays = axios.get("/api/days");
    const fetchAppoitments = axios.get("/api/appointments");
    const fetchInterviewers = axios.get("/api/interviewers");

    Promise.all([fetchDays, fetchAppoitments, fetchInterviewers]).then(
      (all) => {
        setState((prev) => ({
          ...prev,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data,
        }));
      }
    );
  }, []);

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointments.map((appointment) => {
          const interview = getInterview(state, appointment.interview);
          return (
            <Appointment
              key={appointment.id}
              {...appointment}
              interview={interview}
              interviewers={interviewers}
            />
          );
        })}
      </section>
    </main>
  );
}
