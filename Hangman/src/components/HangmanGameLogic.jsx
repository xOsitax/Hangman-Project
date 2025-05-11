import React, { useState, useEffect } from "react";
import VirtualKeyboard from "./VirtualKeyboard";
import { fetchRandomWord } from "./Api";
import "./HangmanGameLogic.css";

// Hangman images
import hangman0 from "../assets/images/hangman0.svg";
import hangman1 from "../assets/images/hangman1.svg";
import hangman2 from "../assets/images/hangman2.svg";
import hangman3 from "../assets/images/hangman3.svg";
import hangman4 from "../assets/images/hangman4.svg";
import hangman5 from "../assets/images/hangman5.svg";
import hangman6 from "../assets/images/hangman6.svg";
import hangman7 from "../assets/images/hangman7.svg";

const hangmanImages = [
  hangman0,
  hangman1,
  hangman2,
  hangman3,
  hangman4,
  hangman5,
  hangman6,
  hangman7,
  hangman8,
];

const HangmanGameLogic = () => {
  const [word, setWord] = useState("");
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [remainingGuesses, setRemainingGuesses] = useState(8);
  const [gameStatus, setGameStatus] = useState("playing");
  useEffect(() => {
    const initializeGame = async () => {
      const randomWord = await fetchRandomWord();
      if (randomWord) {
        setWord(randomWord.toUpperCase());
      }
    };
    initializeGame();
  }, []);

  const displayWord = word
    .split("")
    .map((letter) => (correctLetters.includes(letter) ? letter : "_"))
    .join(" ");

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

  const getHangmanPartClass = (index) => {
    switch (index) {
      case 0:
        return "rope";
      case 1:
        return "head";
      case 2:
        return "eyes";
      case 3:
        return "body";
      case 4:
        return "left-arm";
      case 5:
        return "right-arm";
      case 6:
        return "left-leg";
      case 7:
        return "right-leg";
      case 8:
        return "hat";
      default:
        return "";
    }
  };

  return (
    <div className="game-container">
      <h1 className="game-title">Hangman Game</h1>

      <div className="gamecontent">
        <div className="game-left">
          <p className="worddisplay">Word to Guess: {displayWord}</p>
          <p className="remainingattempts">
            Remaining Attempts: {remainingGuesses}
          </p>
          <p className="gamestatus">
            Status:{" "}
            {gameStatus === "playing"
              ? "Keep Trying"
              : gameStatus === "won"
              ? "You Won!"
              : "Game Over"}
          </p>
          <p className="wrongletters">
            Wrong Letters: {wrongLetters.join(", ")}
          </p>

          {gameStatus === "playing" && (
            <VirtualKeyboard onKeyPress={handleGuess} />
          )}

          {gameStatus !== "playing" && (
            <button onClick={resetGame} className="play-button">
              Play Again
            </button>
          )}
        </div>

        <div className="game-right hangman-images">
          {hangmanImages.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Hangman part ${index}`}
              className={`hangman-step ${
                index <= 8 - remainingGuesses ? "visible" : "hidden"
              } ${getHangmanPartClass(index)}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HangmanGameLogic;
