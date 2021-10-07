import { useEffect, useReducer } from "react";
import axios from "axios";

import {
  reducers,
  SET_APPLICATION_DATA,
  SET_DAY,
  SET_INTERVIEW,
} from "reducers/appDataReducer";
const wsURL = process.env.REACT_APP_WEBSOCKET_URL || "ws://localhost:8001"


// NOTE: "dispatch" will set the state dictated by the reducer
export default function useApplicationData(initial) {
  const reducer = (state, action) => {
    return reducers[action.type](state, action) || reducers.default;
  };

  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });
  const setDay = (day) => dispatch({ type: SET_DAY, day });

  // used (by "save" function) when a user clicks save on a new appointments (or edits)
  const bookInterview = (id, interview) => {
    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      dispatch({ type: SET_INTERVIEW, id, interview });
    });
  };

  // function for when a user deletes an appointment (sets interview to null)
  const cancelInterview = (id) => {
    return axios
      .delete(`/api/appointments/${id}`)
      .then(() => dispatch({ type: SET_INTERVIEW, id, interview: null }));
  };

  useEffect(() => {
    const fetchDays = axios.get("/api/days");
    const fetchAppoitments = axios.get("/api/appointments");
    const fetchInterviewers = axios.get("/api/interviewers");

    const socket = new WebSocket(wsURL);

    // listen for set interview messages and update the specific appointment based on interview val
    socket.onmessage = function (event) {
      console.log("Message Received:", event.data);
      const { type, id, interview } = JSON.parse(event.data);
      if (type === SET_INTERVIEW) {
        dispatch({ type: SET_INTERVIEW, id, interview });
      }
    };

    Promise.all([fetchDays, fetchAppoitments, fetchInterviewers]).then(
      (all) => {
        dispatch({
          type: SET_APPLICATION_DATA,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data,
        });
      }
    );
  }, []);

  return { state, setDay, bookInterview, cancelInterview };
}
