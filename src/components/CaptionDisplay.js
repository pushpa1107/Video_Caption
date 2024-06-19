import React from 'react';
import { Typography } from '@mui/material';

const CaptionDisplay = ({ currentTime, captions }) => {
  const currentCaption = captions.find(caption =>
    currentTime >= caption.time && currentTime < caption.time + 5
  );

  return (
    <div>
      {currentCaption && (
        <Typography variant="h6" align="center" 
        style={{ position: 'absolute',
         bottom: 10,height:'40px', 
         width: '25%', background: '#FDFFC2',
         marginLeft:'20%',
         borderRadius:'50px 10px 50px 10px ', color: '#005B41',
         marginBottom:'25%' }}>
          {currentCaption.text}
        </Typography>
      )}
    </div>
  );
};

export default CaptionDisplay;
