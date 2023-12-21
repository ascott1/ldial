import Head from "next/head";
import styles from "./RadioStationCard.module.css"; // Assuming you're using CSS Modules
import { FaRegHeart, FaHeart } from "react-icons/fa";

const RadioStationCard = ({
  station,
  isPlaying,
  onSelect,
  onFavoriteToggle,
  isFavorite,
}) => {
  const cardClass = isPlaying
    ? `${styles.card} ${styles.playing}`
    : `${styles.card}`;

  const handleFavoriteClick = (e) => {
    e.stopPropagation(); // Prevents the onSelect event when clicking the favorite button
    onFavoriteToggle(station.id);
  };

  return (
    <div className={cardClass} onClick={() => onSelect(station)}>
      <h2 className={styles.stationName}>{station.name}</h2>
      <p className={styles.stationDescription}>{station.description}</p>
      <button onClick={handleFavoriteClick} className={styles.favoriteButton}>
        {isFavorite ? <FaHeart /> : <FaRegHeart />}{" "}
        {/* Change these to actual icons if needed */}
      </button>
    </div>
  );
};

export default RadioStationCard;
