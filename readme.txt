import React, { useState } from 'react';

const TextareaWithWrap: React.FC = () => {
  const [text, setText] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputText = e.target.value;
    const wrappedText = wrapText(inputText, 15);
    setText(wrappedText);
  };

  const wrapText = (text: string, lineLength: number): string => {
    const words = text.split(' ');
    let wrappedText = '';
    let currentLineLength = 0;

    words.forEach(word => {
      if (currentLineLength + word.length + 1 > lineLength) {
        wrappedText += '\n' + word + ' ';
        currentLineLength = word.length + 1;
      } else {
        wrappedText += word + ' ';
        currentLineLength += word.length + 1;
      }
    });

    return wrappedText.trim();
  };

  return (
    <textarea
      value={text}
      onChange={handleChange}
      rows={10}
      cols={30}
      style={{ whiteSpace: 'pre-wrap' }}
    />
  );
};

export default TextareaWithWrap;