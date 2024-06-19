import React, { useState } from 'react';
import { TextField, Button, Container, Grid } from '@mui/material';

const CaptionForm = ({ setVideoUrl, addCaption }) => {
  const [url, setUrl] = useState('');
  const [caption, setCaption] = useState('');
  const [timestamp, setTimestamp] = useState('');

  // List of prohibited words or phrases
  const prohibitedWords = ['badword1', 'badword2', 'badphrase'];

  const handleAddCaption = () => {
    if (caption && timestamp) {
      // Check if caption has at least 5 words
      const words = caption.trim().split(/\s+/);
      if (words.length < 5) {
        alert('Caption must be at least 5 words long.');
        return;
      }

      // Check for prohibited words or phrases
      const containsProhibitedWord = prohibitedWords.some(word =>
        caption.toLowerCase().includes(word)
      );
      if (containsProhibitedWord) {
        alert('Caption contains prohibited words or phrases.');
        return;
      }

      // If all checks pass, add the caption
      addCaption({ text: caption, time: parseFloat(timestamp) });
      setCaption('');
      setTimestamp('');
    }
  };

  const handleSetVideoUrl = () => {
    // Check if the URL is a direct video URL (ends with .mp4, .webm, .ogg)
    if (/\.(mp4|webm|ogg)$/i.test(url)) {
      setVideoUrl(url);
    }
    // Check if the URL is a YouTube video URL
    else if (url.includes('youtube.com/watch?v=')) {
      // Extract video ID from YouTube URL
      const videoId = url.match(/[?&]v=([^&]+)/);
      if (videoId) {
        setVideoUrl(videoId[1]);
      } else {
        alert('Please enter a valid YouTube video URL.');
      }
    } else {
      alert('Please enter a valid video URL.');
    }
  };
  
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <TextField
            fullWidth
            label="Video URL"
            variant="outlined"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </Grid>
        <Grid item xs={4}>
          <Button variant="contained" 
          style={{marginTop:'10px'}}
          onClick={handleSetVideoUrl}>
            Load Video
          </Button>
        </Grid>

        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Caption"
            variant="outlined"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            fullWidth
            label="Timestamp (in seconds)"
            variant="outlined"
            value={timestamp}
            onChange={(e) => setTimestamp(e.target.value)}
          />
        </Grid>
        <Grid item xs={2}>
          <Button variant="contained"  style={{marginTop:'10px'}} onClick={handleAddCaption}>
            Add Caption
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CaptionForm;
