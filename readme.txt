import React, { useState } from 'react';

const TextareaComponent: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [rows, setRows] = useState<number>(5);
  const [lineLength, setLineLength] = useState<number>(50);
  const [error, setError] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputText = event.target.value;
    const wrappedText = wrapText(inputText, lineLength);

    if (wrappedText.split('\n').length > rows) {
      setError(`Text exceeds the maximum number of ${rows} rows.`);
    } else {
      setError('');
      setText(wrappedText);
    }
  };

  const wrapText = (input: string, maxLength: number): string => {
    const words = input.split(' ');
    let wrappedText = '';
    let currentLineLength = 0;

    words.forEach(word => {
      if (currentLineLength + word.length + 1 > maxLength) {
        wrappedText += '\n';
        currentLineLength = 0;
      } else if (wrappedText.length > 0) {
        wrappedText += ' ';
        currentLineLength += 1;
      }
      wrappedText += word;
      currentLineLength += word.length;
    });

    return wrappedText;
  };

  return (
    <div>
      <div>
        <label>
          Rows:
          <input
            type="number"
            value={rows}
            onChange={(e) => setRows(Number(e.target.value))}
          />
        </label>
      </div>
      <div>
        <label>
          Line Length:
          <input
            type="number"
            value={lineLength}
            onChange={(e) => setLineLength(Number(e.target.value))}
          />
        </label>
      </div>
      <textarea value={text} onChange={handleChange} rows={rows} style={{ width: '100%', height: `${rows * 20}px` }} />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <p>Current value: {text}</p>
    </div>
  );
};

export default TextareaComponent;