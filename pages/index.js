import React, { useState, useEffect } from "react";
import stations from "../data/stations";
import PageTitle from "../components/PageTitle";
import RadioStationCard from "../components/RadioStationCard";
import AudioPlayer from "../components/AudioPlayer";

import styles from "../styles/Home.module.css";

const IndexPage = () => {
  const [currentStation, setCurrentStation] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Load favorites from localStorage on component mount
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  const handleStationSelect = (station) => {
    setCurrentStation(station);
    setIsPlaying(true);
  };

  const handleFavoriteToggle = (stationId) => {
    const updatedFavorites = favorites.includes(stationId)
      ? favorites.filter((id) => id !== stationId)
      : [...favorites, stationId];

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const sortedStations = [...stations].sort((a, b) => {
    if (favorites.includes(a.id) && !favorites.includes(b.id)) return -1;
    if (!favorites.includes(a.id) && favorites.includes(b.id)) return 1;
    return a.id.localeCompare(b.id);
  });

  return (
    <div>
      <PageTitle />
      <div className={styles.stations}>
        {sortedStations.map((station) => (
          <RadioStationCard
            key={station.id}
            station={station}
            isPlaying={currentStation?.id === station.id && isPlaying}
            onSelect={handleStationSelect}
            onFavoriteToggle={handleFavoriteToggle}
            isFavorite={favorites.includes(station.id)}
          />
        ))}
      </div>
      {currentStation && (
        <AudioPlayer
          station={currentStation}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
        />
      )}
    </div>
  );
};

export default IndexPage;
