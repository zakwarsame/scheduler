import React from "react";
import "components/DayListItem.scss";
import classnames from "classnames";

export default function DayListItem(props) {
  let itemClass = classnames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots,
  });

  const formatSpots = (spots) => {
    if (!spots) return "no spots remaining";
    return (spots += spots === 1 ? " spot remaining" : " spots remaining");
  };

  return (
    <li onClick={() => props.setDay(props.name)} className={itemClass}>
      <h2>{props.name}</h2>
      <h3> {formatSpots(props.spots)}</h3>
    </li>
  );
}
