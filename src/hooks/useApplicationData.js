import { useEffect, useReducer } from "react";
import axios from "axios";

export default function useApplicationData(initial) {
  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";

  const reducers = {
    SET_DAY(state, action) {
      return { ...state, day: action.day };
    },
    SET_INTERVIEW(state, action) {
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
      const appointment = {
        ...state.appointments[action.id],
        interview: action.interview && { ...action.interview },
      };
      const appointments = {
        ...state.appointments,
        [action.id]: appointment,
      };
      const days = updateSpots(appointments);
      return { ...state, appointments, days };
    },

    SET_APPLICATION_DATA(state, action) {
      return {
        ...state,
        days: action.days,
        appointments: action.appointments,
        interviewers: action.interviewers,
      };
    },
    default: action => new Error(
      `Tried to reduce with unsupported action type: ${action.type}`)
  };

  function reducer(state, action) {
    return (reducers[action.type](state, action)|| reducers.default )
  }


  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });
  const setDay = (day) => dispatch({ type: SET_DAY, day });

  const bookInterview = (id, interview) => {
    return axios.put(`/api/appointments/${id}`, { interview }).then((res) => {
      dispatch({ type: SET_INTERVIEW, id, interview });
    });
  };

  const cancelInterview = (id) => {
    return axios
      .delete(`/api/appointments/${id}`)
      .then(() => dispatch({ type: SET_INTERVIEW, id, interview: null }));
  };

  useEffect(() => {
    const fetchDays = axios.get("/api/days");
    const fetchAppoitments = axios.get("/api/appointments");
    const fetchInterviewers = axios.get("/api/interviewers");

    Promise.all([fetchDays, fetchAppoitments, fetchInterviewers]).then(
      (all) => {
        dispatch(
          {
            type: SET_APPLICATION_DATA,
            days: all[0].data,
            appointments: all[1].data,
            interviewers: all[2].data,
          }
        );
      }
    );
  }, []);

  return { state, setDay, bookInterview, cancelInterview };
}
