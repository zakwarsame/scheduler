import { useEffect, useState } from "react";
import axios from "axios";

export default function useApplicationData(initial) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });
  const setDay = (day) => setState({ ...state, day });

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const days = updateSpots(appointments);

    return axios.put(`/api/appointments/${id}`, { interview }).then((res) => {
      setState({ ...state, appointments, days });
    });
  };

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const days = updateSpots(appointments);

    return axios
      .delete(`/api/appointments/${id}`)
      .then(() => setState({ ...state, appointments, days }));
  };

  const updateSpots = (appointments) => {
    const currentDay = state.days.filter((day) => day.name === state.day);
    let counter = 0;
    for (let key of currentDay[0].appointments) {
      if (!appointments[key].interview) {
        counter++;
      }
    }
    const newDay = { ...currentDay[0], spots: counter };
    const days = state.days.map((day) => {
      return day.id === newDay.id ? newDay : day;
    });

    return days;
  };

  //   updateSpots(state)

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

  return { state, setDay, bookInterview, cancelInterview };
}
