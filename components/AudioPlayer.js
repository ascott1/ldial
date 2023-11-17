import React, { useEffect, useRef, useState } from "react";
import Head from "next/head";
import styles from "./AudioPlayer.module.css";

const AudioPlayer = ({ station, isPlaying, setIsPlaying }) => {
  const audioRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  // Initial setup for the audio element
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.oncanplaythrough = () => setIsLoading(false);
      audioRef.current.onwaiting = () => setIsLoading(true);
    }
  }, []);

  // Effect for loading new station
  useEffect(() => {
    if (station && audioRef.current) {
      setIsLoading(true);
      audioRef.current.src = station.streamUrl;
      audioRef.current.load();
      if (isPlaying) {
        tryToPlayAudio();
      }
    }
  }, [station]);

  // Debounced play/pause logic
  useEffect(() => {
    if (!isFirstLoad) {
      const timeoutId = setTimeout(() => {
        if (isPlaying) {
          tryToPlayAudio();
        } else {
          audioRef.current.pause();
        }
      }, 300);

      return () => clearTimeout(timeoutId);
    } else {
      setIsFirstLoad(false);
    }
  }, [isPlaying]);

  const tryToPlayAudio = async () => {
    if (audioRef.current && audioRef.current.paused) {
      try {
        await audioRef.current.play();
      } catch (error) {
        console.error("Error playing audio:", error);
        setIsPlaying(false);
      }
    }
  };

  return (
    <div className={styles.audioPlayer}>
      <Head>
        <title>{station?.name || "Ldial"}</title>
      </Head>
      <button onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? "Pause" : "Play"}
      </button>
      <div>Now Playing: {station?.name || "Select a Station"}</div>
      {isLoading && <div>Loading...</div>}
      <audio ref={audioRef} />
    </div>
  );
};

export default AudioPlayer;
