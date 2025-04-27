import React, { useState, useEffect } from 'react';

const TypeWriter = ({ words = [], typingSpeed = 10000, deletingSpeed = 10000, pauseTime = 1 }) => {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);

  useEffect(() => {
    if (words.length === 0) return;

    const type = () => {
      const currentWord = words[wordIndex];
      const shouldDelete = isDeleting;

      if (shouldDelete) {
        setText(prev => prev.slice(0, -1));
        if (text === '') {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      } else {
        setText(currentWord.slice(0, text.length + 1));
        if (text === currentWord) {
          setIsWaiting(true);
          setTimeout(() => {
            setIsWaiting(false);
            setIsDeleting(true);
          }, pauseTime);
        }
      }
    };

    const timeout = setTimeout(
      type,
      isWaiting ? pauseTime : isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timeout);
  }, [text, wordIndex, isDeleting, isWaiting, words, typingSpeed, deletingSpeed, pauseTime]);

  return (
    <span className="inline-block min-w-[20ch]">
      {text}
      <span className="animate-blink">|</span>
    </span>
  );
};

export default TypeWriter; 