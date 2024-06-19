import React, { useRef, useEffect } from 'react';
import { Button } from '@mui/material';

const VideoPlayer = ({ videoUrl, onTimeUpdate }) => {
  const videoRef = useRef(null);
  const isPlayingRef = useRef(false); // To track whether video should play

  useEffect(() => {
    const videoElement = videoRef.current;

    if (videoElement) {
      videoElement.src = videoUrl; // Set new video source
      videoElement.load(); // Load new video
      videoElement.addEventListener('loadedmetadata', handleLoadedMetadata);
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
      }
    };
  }, [videoUrl]);

  const handleLoadedMetadata = () => {
    // Video is ready to play
    if (isPlayingRef.current) {
      videoRef.current.play().catch((error) => {
        console.error('Play request interrupted:', error);
      });
    }
  };

  const handlePlay = () => {
    isPlayingRef.current = true;
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error('Play request interrupted:', error);
      });
    }
  };

  const handlePause = () => {
    isPlayingRef.current = false;
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      onTimeUpdate(videoRef.current.currentTime);
    }
  };

  return (
    <div>
      <video
        ref={videoRef}
        width="80%"
        controls
        onTimeUpdate={handleTimeUpdate}
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
     
    </div>
  );
};

export default VideoPlayer;
