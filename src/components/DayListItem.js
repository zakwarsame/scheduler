import React from "react";
import "components/DayListItem.scss";
import classnames from "classnames";

export default function DayListItem(props) {
  const { selected, spots, setDay, name } = props;
  let itemClass = classnames("day-list__item", {
    "day-list__item--selected": selected,
    "day-list__item--full": !spots,
  });

  const formatSpots = (someSpots) => {
    if (!someSpots) return "no spots remaining";
    return (someSpots += someSpots === 1 ? " spot remaining" : " spots remaining");
  };

  return (
    <li onClick={() => setDay(name)} className={itemClass}>
      <h2>{name}</h2>
      <h3> {formatSpots(spots)}</h3>
    </li>
  );
}
