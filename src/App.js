import React, { useState } from 'react';
import { Container } from '@mui/material';
import CaptionForm from './components/CaptionForm';
import VideoPlayer from './components/VideoPlayer';
import CaptionDisplay from './components/CaptionDisplay';

const App = () => {
  const [videoUrl, setVideoUrl] = useState('');

  const [captions, setCaptions] = useState([]);
  const [currentTime, setCurrentTime] = useState(0);

  const addCaption = (caption) => {
    setCaptions([...captions, caption]);
  };

  const handleTimeUpdate = (time) => {
    setCurrentTime(time);
  }

  return (
    <Container>
      <CaptionForm setVideoUrl={setVideoUrl} addCaption={addCaption} />
      {videoUrl && (
        <div style={{margin:'20px'}}>
          <VideoPlayer videoUrl={videoUrl} onTimeUpdate={handleTimeUpdate} />
          <CaptionDisplay currentTime={currentTime} captions={captions} />
        </div>
      )}
    </Container>
  );
};

export default App;
