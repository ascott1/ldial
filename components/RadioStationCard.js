import React from "react";
import styles from "./RadioStationCard.module.css"; // Assuming you're using CSS Modules

const RadioStationCard = ({ station, onSelect }) => {
  return (
    <div className={styles.card} onClick={() => onSelect(station)}>
      <h3 className={styles.stationName}>{station.name}</h3>
      <p className={styles.stationDescription}>{station.description}</p>
      {/* Add more station details here */}
    </div>
  );
};

export default RadioStationCard;
