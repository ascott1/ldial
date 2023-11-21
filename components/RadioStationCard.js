import Head from "next/head";
import styles from "./RadioStationCard.module.css"; // Assuming you're using CSS Modules

const RadioStationCard = ({ station, isPlaying, onSelect }) => {
  const cardClass = isPlaying
    ? `${styles.card} ${styles.playing}`
    : `${styles.card}`;

  return (
    <div className={cardClass} onClick={() => onSelect(station)}>
      <h2 className={styles.stationName}>{station.name}</h2>
      <p className={styles.stationDescription}>{station.description}</p>
      {/* Add more station details here */}
    </div>
  );
};

export default RadioStationCard;
