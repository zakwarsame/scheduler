import React, { useState } from "react";

// transition the mode based on current activity by user
export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    setMode(newMode);
    !replace
      ? setHistory([...history, newMode])
      : setHistory((prev) => [...prev.slice(0, prev.length - 1), newMode]);
  };

  const back = () => {
    setHistory((prev) => [...prev.slice(0, prev.length - 1)]);
    if (mode !== history[0] && history.length > 1)
      setMode(history[history.length - 2]);
  };

  return { mode, transition, back };
}
