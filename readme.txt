import React, { useState, useEffect, ChangeEvent } from 'react';

interface TextAreaProps {
  lineLength: number;
  numLines: number;
}

const TextArea: React.FC<TextAreaProps> = ({ lineLength, numLines }) => {
  const [text, setText] = useState<string>('');

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const wrapText = (input: string): string => {
    const words = input.split(' ');
    let wrappedText = '';
    let currentLine = '';

    words.forEach(word => {
      if (currentLine.length + word.length + 1 > lineLength) {
        wrappedText += currentLine.trim() + '\n';
        currentLine = word + ' ';
      } else {
        currentLine += word + ' ';
      }
    });

    wrappedText += currentLine.trim();

    const lines = wrappedText.split('\n');
    if (lines.length > numLines) {
      return lines.slice(0, numLines).join('\n');
    }

    return wrappedText;
  };

  useEffect(() => {
    setText(prevText => wrapText(prevText));
  }, [lineLength, numLines]);

  return (
    <textarea
      value={text}
      onChange={handleTextChange}
      rows={numLines}
      style={{ width: `${lineLength * 8}px` }} // Adjust width based on line length
    />
  );
};

export default TextArea;