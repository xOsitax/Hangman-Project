import React, { useState, useEffect } from "react";

const HangmanGameLogic = () => {
  const [word, setWord] = useState("");
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [remainingGuesses, setRemainingGuesses] = useState(8);
  const [gameStatus, setGameStatus] = useState("playing"); // 'playing', 'won', 'lost'

  // Fetch a word from API
  const fetchRandomWord = async () => {
    try {
      const response = await fetch(
        "https://random-word-api.herokuapp.com/word?number=1"
      );
      const data = await response.json();
      return data[0];
    } catch (error) {
      console.error("Error fetching word:", error);
      return null;
    }
  };

  // Initialize the game
  useEffect(() => {
    const initializeGame = async () => {
      const randomWord = await fetchRandomWord();
      if (randomWord) {
        setWord(randomWord.toUpperCase());
      }
    };
    initializeGame();
  }, []);

  // Display the word with correct letters
  const displayWord = word
    .split("")
    .map((letter) => (correctLetters.includes(letter) ? letter : "_"))
    .join(" ");

  // Handle player guesses
  const handleGuess = (letter) => {
    if (
      gameStatus !== "playing" ||
      !letter ||
      letter.length !== 1 ||
      !/^[a-zA-Z]$/.test(letter)
    ) {
      alert("Please enter a single letter (A-Z only).");
      return;
    }

    letter = letter.toUpperCase();

    if (correctLetters.includes(letter) || wrongLetters.includes(letter)) {
      alert("You already guessed that letter!");
      return;
    }

    if (word.includes(letter)) {
      setCorrectLetters((prev) => [...prev, letter]);
    } else {
      setWrongLetters((prev) => [...prev, letter]);
      setRemainingGuesses((prev) => prev - 1);
    }
  };

  // Watch for win/loss
  useEffect(() => {
    const wordLetters = [...new Set(word.split(""))];
    const hasWon = wordLetters.every((letter) =>
      correctLetters.includes(letter)
    );

    if (hasWon) {
      setGameStatus("won");
    } else if (remainingGuesses <= 0) {
      setGameStatus("lost");
    }
  }, [correctLetters, remainingGuesses, word]);

  // Reset the game
  const resetGame = async () => {
    setCorrectLetters([]);
    setWrongLetters([]);
    setRemainingGuesses(8);
    setGameStatus("playing");
    const randomWord = await fetchRandomWord();
    if (randomWord) {
      setWord(randomWord.toUpperCase());
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Hangman Game</h1>
      <p className="mb-2">Word to Guess: {displayWord}</p>
      <p className="mb-2">Remaining Attempts: {remainingGuesses}</p>
      <p className="mb-2">
        Status:{" "}
        {gameStatus === "playing"
          ? "Keep Trying"
          : gameStatus === "won"
          ? "You Won!"
          : "Game Over"}
      </p>
      <p className="mb-4">Wrong Letters: {wrongLetters.join(", ")}</p>

      {gameStatus === "playing" && (
        <input
          type="text"
          maxLength="1"
          onChange={(e) => {
            handleGuess(e.target.value);
            e.target.value = "";
          }}
          placeholder="Guess a letter"
          className="border p-2 mb-4 w-full"
        />
      )}

      {gameStatus !== "playing" && (
        <button
          onClick={resetGame}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Play Again
        </button>
      )}
    </div>
  );
};

export default HangmanGameLogic;
