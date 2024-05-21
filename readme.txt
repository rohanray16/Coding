import React, { useState, ChangeEvent, useEffect } from 'react';

const MAX_LINE_LENGTH = 35;

const TextArea: React.FC = () => {
  const [text, setText] = useState<string>('');

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const inputText = e.target.value;
    setText(wrapText(inputText));
  };

  const wrapText = (input: string): string => {
    const words = input.split(' ');
    let wrappedText = '';
    let currentLine = '';

    words.forEach(word => {
      if (currentLine.length + word.length + 1 > MAX_LINE_LENGTH) {
        wrappedText += currentLine.trim() + '\n';
        currentLine = word + ' ';
      } else {
        currentLine += word + ' ';
      }
    });

    wrappedText += currentLine.trim();

    return wrappedText;
  };

  useEffect(() => {
    setText(wrapText(text));
  }, [text]);

  return (
    <textarea
      value={text}
      onChange={handleTextChange}
      rows={10}
      style={{ width: '100%', height: '200px' }}
    />
  );
};

export default TextArea;