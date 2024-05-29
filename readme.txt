import React, { useState } from 'react';
import './App.css';

const App: React.FC = () => {
  const [text, setText] = useState('');

  const formatText = (input: string): string => {
    const words = input.split(' ');
    let formattedText = '';
    let currentLine = '';

    words.forEach((word) => {
      if ((currentLine + word).length > 15) {
        if (currentLine.length > 0) {
          formattedText += currentLine.trim() + '\n';
        }
        currentLine = word + ' ';
      } else {
        currentLine += word + ' ';
      }
    });

    if (currentLine.length > 0) {
      formattedText += currentLine.trim();
    }

    return formattedText;
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const input = event.target.value.replace(/\n/g, ' ');
    setText(formatText(input));
  };

  return (
    <div className="App">
      <h1>Custom Textarea</h1>
      <textarea
        value={text}
        onChange={handleChange}
        rows={10}
        cols={30}
        style={{ whiteSpace: 'pre-wrap' }}
      />
    </div>
  );
};

export default App;