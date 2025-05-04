import React, { useState, useEffect } from "react";

function Hangman() {
  const [word, setWord] = useState("");
  const [guess, setGuess] = useState("");

  useEffect(() => {
    fetch("https://random-word-api.herokuapp.com/word?number=1")
      .then((response) => response.json())
      .then((data) => setWord(data[0]))
      .catch((error) => console.error("Error fetching word:", error));
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

export default Hangman;
