import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';

const CaptchaComponent: React.FC = () => {
  const [captchaText, setCaptchaText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [captchaImage, setCaptchaImage] = useState('');

  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let text = '';
    for (let i = 0; i < 6; i++) {
      text += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaText(text);
    drawCaptcha(text);
  };

  const drawCaptcha = (text: string) => {
    const canvas = document.createElement('canvas');
    canvas.width = 150;
    canvas.height = 50;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.font = '25px Arial';
      ctx.fillText(text, 10, 35);
    }
    setCaptchaImage(canvas.toDataURL('image/png'));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value);
  };

  const verifyCaptcha = () => {
    if (userInput === captchaText) {
      alert('Successful');
    } else {
      alert('Failed. Try again!');
      generateCaptcha(); // Regenerate captcha on failure
      setUserInput(''); // Reset user input
    }
  };

  return (
    <div>
      <img src={captchaImage} alt="Captcha" style={{ margin: '10px' }} />
      <TextField
        label="Enter Captcha"
        variant="outlined"
        value={userInput}
        onChange={handleChange}
        fullWidth
      />
      <Button variant="contained" color="primary" onClick={verifyCaptcha} style={{ margin: '10px' }}>
        Verify
      </Button>
    </div>
  );
};

export default CaptchaComponent;
