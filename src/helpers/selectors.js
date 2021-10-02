export function getAppointmentsForDay(state, day) {
  const matchArr = [];
  const getDayMatch = state.days.filter((eachDay) => eachDay.name === day);

  if (!getDayMatch[0]) return matchArr;
  for (let appt of getDayMatch[0].appointments) {
    matchArr.push(state.appointments[appt]);
  }

  return matchArr;
}

export function getInterview(state, interview) {
  const obj = {};
  if (!interview || !state) return null;
  obj["student"] = interview.student;
  obj["interviewer"] = state.interviewers[interview.interviewer];

  return obj;
}
