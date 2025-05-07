import React, { useState, useEffect } from "react";
import VirtualKeyboard from "./VirtualKeyboard";
import './HangmanGameLogic.css';

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
    <div className="game-container">
    <h1 className="game-title">Hangman Game</h1>
      <div className="gamecontent">
      <p className="worddisplay">Word to Guess: {displayWord}</p>
      <p className="remainingattempts">Remaining Attempts: {remainingGuesses}</p>
      <p className="gamestatus">
        Status:{" "}
        {gameStatus === "playing"
          ? "Keep Trying"
          : gameStatus === "won"
          ? "You Won!"
          : "Game Over"}
      </p>
      <p className="wrongletters">Wrong Letters: {wrongLetters.join(", ")}</p>

      {gameStatus === "playing" && (
          <VirtualKeyboard onKeyPress={handleGuess} />
        )}

      {gameStatus !== "playing" && (
        <button
          onClick={resetGame}
          className="play-button"
        >
          Play 
        </button>
      )}
    </div>
  </div>
  );
};

export default HangmanGameLogic;
