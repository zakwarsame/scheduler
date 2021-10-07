const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

// Reducers with object lookup pattern.
const reducers = {
  SET_DAY(state, action) {
    return { ...state, day: action.day };
  },

  /*(Set and update the spots for interviews
      1. current day is selected based on set day
      2. counts number of null interviews from the appointmnets obj
      3. iterates through days array and replaces the day with the new day that contains updated spots
   */

  SET_INTERVIEW(state, action) {
    const updateSpots = (appointments) => {
      const currentDay = state.days.filter((day) => day.name === state.day);
      let countSpots = 0;
      currentDay[0].appointments.forEach(
        (appointment) => !appointments[appointment].interview && countSpots++
      );
      const newDay = { ...currentDay[0], spots: countSpots };
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
  default: (action) =>
    new Error(`Tried to reduce with unsupported action type: ${action.type}`),
};

export { reducers, SET_APPLICATION_DATA, SET_DAY, SET_INTERVIEW };
