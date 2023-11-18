import React, { useEffect, useRef, useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa6";

import Head from "next/head";
import styles from "./AudioPlayer.module.css";

const AudioPlayer = ({ station, isPlaying, setIsPlaying }) => {
  const audioRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  // Setup event listeners for the audio element
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const handleCanPlay = () => setIsLoading(false);
      const handleWaiting = () => setIsLoading(true);
      const handlePlay = () => setIsLoading(false);
      const handlePause = () => setIsLoading(false);
      const handleError = () => setIsLoading(false);

      audio.addEventListener("canplay", handleCanPlay);
      audio.addEventListener("waiting", handleWaiting);
      audio.addEventListener("play", handlePlay);
      audio.addEventListener("pause", handlePause);
      audio.addEventListener("error", handleError);

      return () => {
        audio.removeEventListener("canplay", handleCanPlay);
        audio.removeEventListener("waiting", handleWaiting);
        audio.removeEventListener("play", handlePlay);
        audio.removeEventListener("pause", handlePause);
        audio.removeEventListener("error", handleError);
      };
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
      <button
        className={styles.button}
        onClick={() => setIsPlaying(!isPlaying)}
      >
        {isPlaying ? (
          <FaPause aria-label="pause" />
        ) : (
          <FaPlay aria-label="play" />
        )}
      </button>
      {!isLoading && (
        <div>Now Playing: {station?.name || "Select a Station"}</div>
      )}

      {isLoading && <div>Loading...</div>}
      <audio ref={audioRef} />
    </div>
  );
};

export default AudioPlayer;
