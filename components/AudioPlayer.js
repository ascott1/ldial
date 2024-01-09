/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa6";
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Head from "next/head";
import styles from "./AudioPlayer.module.css";

const AudioPlayer = ({ station, isPlaying, setIsPlaying }) => {
  const audioRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 5; // Maximum number of retries

  // toast notification
  const notify = (message) => toast(message);

  // Resume playback if the audio is interrupted
  const resumePlayback = () => {
    if (retryCount < maxRetries) {
      setTimeout(() => {
        if (
          audioRef.current &&
          !audioRef.current.paused &&
          !audioRef.current.ended
        ) {
          tryToPlayAudio();
          setRetryCount(retryCount + 1);
        }
      }, 3000 * retryCount); // Increase delay with each retry
    } else {
      console.log("Max retries reached, not attempting further playback.");
      setIsLoading(false);
      setRetryCount(0); // Reset retry count
    }
  };

  // Setup event listeners for the audio element
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const handleCanPlay = () => {
        setIsLoading(false);
        setRetryCount(0); // Reset retry count on successful playback
        if (isPlaying || isFirstLoad) {
          tryToPlayAudio();
        }
      };
      const handleWaiting = () => setIsLoading(true);
      const handleError = (e) => {
        console.error("Audio playback error:", e);
        notify("💔 Playback error occurred");
        resumePlayback(); // Attempt to resume playback
      };

      const handleStalled = () => {
        console.log("Audio playback stalled");
        setIsLoading(true);
        resumePlayback();
      };

      audio.addEventListener("canplay", handleCanPlay);
      audio.addEventListener("waiting", handleWaiting);
      audio.addEventListener("error", handleError);
      audio.addEventListener("stalled", handleStalled);

      return () => {
        audio.removeEventListener("canplay", handleCanPlay);
        audio.removeEventListener("waiting", handleWaiting);
        audio.removeEventListener("error", handleError);
        audio.removeEventListener("stalled", handleStalled);
      };
    }
  }, [isPlaying, isFirstLoad]);

  // Effect for loading new station
  useEffect(() => {
    if (station && audioRef.current) {
      setIsLoading(true);

      // Set the source for the audio
      audioRef.current.src = station.streamUrl;
      // Load the audio
      audioRef.current.load();
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
        notify("Error playing audio");
      }
    }
  };

  return (
    <>
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
          <div>
            <span className={styles.now}>Now Playing: </span>
            <span className={styles.station}>
              {station?.name || "Select a Station"}
            </span>
          </div>
        )}
        {isLoading && <div>Loading...</div>}
        <audio ref={audioRef} preload="auto" />
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Zoom}
      />
    </>
  );
};

export default AudioPlayer;
