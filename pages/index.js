import React, { useState } from "react";
import stations from "../data/stations";
import PageTitle from "../components/PageTitle";
import RadioStationCard from "../components/RadioStationCard";
import AudioPlayer from "../components/AudioPlayer";

const IndexPage = () => {
  const [currentStation, setCurrentStation] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleStationSelect = (station) => {
    setCurrentStation(station);
    setIsPlaying(true);
  };

  return (
    <div>
      <PageTitle />
      <div className="station-map">
        {stations
          // Sort stations by ID
          .sort((a, b) => {
            if (a.id < b.id) {
              return -1;
            }
            if (a.id > b.id) {
              return 1;
            }
            return 0;
          })
          // Map over stations and render a RadioStationCard for each one
          .map((station) => (
            <RadioStationCard
              key={station.id}
              station={station}
              onSelect={handleStationSelect}
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
