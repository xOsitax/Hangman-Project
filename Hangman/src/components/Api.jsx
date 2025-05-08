import React, { useState, useEffect } from "react";

function RandomWord() {
  const [word, setWord] = useState("");
  const [guess, setGuess] = useState("");

  // this part fetches word and discards ones over 8 characters
  const fetchWord = () => {
    fetch("https://random-word-api.herokuapp.com/word?number=1")
      .then((response) => response.json())
      .then((data) => {
        const fetchedWord = data[0];
        if (fetchedWord.length <= 8) {
          setWord(fetchedWord);
        } else {
          fetchWord();
        }
      })
      .catch((error) => console.error("Error fetching word:", error));
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
        onChange={(e) => setGuess(e.target.value)}
        maxLength={1}
      />

      {/* Additional game logic here */}
    </div>
  );
}

export default RandomWord;
