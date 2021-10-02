import { renderHook, act } from "@testing-library/react-hooks";

import useVisualMode from "hooks/useVisualMode";

// set initial visual
const FIRST = "FIRST";

test("useVisualMode should initialize with default value", () => {
  const { result } = renderHook(() => useVisualMode(FIRST));

  expect(result.current.mode).toBe(FIRST);
});

// test for the transition to the next mode

const SECOND = "SECOND";

test("useVisualMode should transition to another mode", () => {
  const { result } = renderHook(() => useVisualMode(FIRST));

  act(() => result.current.transition(SECOND));
  expect(result.current.mode).toBe(SECOND);
});

// test for "back" to check if we make it to the prev mode

const THIRD = "THIRD";

test("useVisualMode should return to previous mode", () => {
  const { result } = renderHook(() => useVisualMode(FIRST));

  act(() => result.current.transition(SECOND));
  expect(result.current.mode).toBe(SECOND);

  act(() => result.current.transition(THIRD));
  expect(result.current.mode).toBe(THIRD);

  act(() => result.current.back());
  expect(result.current.mode).toBe(SECOND);

  act(() => result.current.back());
  expect(result.current.mode).toBe(FIRST);
});


test("useVisualMode should not return to previous mode if already at initial", () => {
    const { result } = renderHook(() => useVisualMode(FIRST));
  
    act(() => result.current.back());
    expect(result.current.mode).toBe(FIRST);
  });


// test for "back" transition with replace (instances like when it goes from Form > Status > Error, and the user goes back - we need to skip the Status )

test("useVisualMode should replace the current mode", () => {
    const { result } = renderHook(() => useVisualMode(FIRST));
  
    act(() => result.current.transition(SECOND));
    expect(result.current.mode).toBe(SECOND);
  
    // Passing "true" to transition(THIRD, true) says "Transition to THIRD by REPLACING SECOND"
    act(() => result.current.transition(THIRD, true));
    expect(result.current.mode).toBe(THIRD);
  
    act(() => result.current.back());
    expect(result.current.mode).toBe(FIRST);
  });