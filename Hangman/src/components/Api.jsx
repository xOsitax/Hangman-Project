import React, { useState, useEffect } from "react";

function RandomWord() {
  const [word, setWord] = useState("");
  const [guess, setGuess] = useState("");

  // this part fetches word and discards ones over 8 characters
  const fetchWord = async () => {
    try {
      let fetchedWord = "";
      do {
        const response = await fetch(
          "https://random-word-api.herokuapp.com/word?number=1"
        );
        const data = await response.json();
        fetchedWord = data[0];
      } while (fetchedWord.length > 8);

      setWord(fetchedWord);
    } catch (error) {
      console.error("Error fetching word:", error);
    }
  };
  useEffect(() => {
    fetchWord();
  }, []);

  return (
    <div>
      <h1>Hangman Game</h1>
      <p>Word: {word}</p>
      <input
        type="text"
        value={guess}
        onChange={(e) => {
          const val = e.target.value.toUpperCase();
          if (/^[A-Z]?$/.test(val)) {
            setGuess(val);
          }
        }}
        maxLength={1}
      />
    </div>
  );
}

export default RandomWord;
