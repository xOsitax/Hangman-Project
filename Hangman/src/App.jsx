import React from "react";
import HangmanGameLogic from "./components/HangmanGameLogic";
import Header from "./components/Header";

function App() {
  return (
    <div className="p-10">
      <Header />
      <h1 className="text-2xl font-bold"></h1>
      <HangmanGameLogic />
    </div>
  );
}

export default App;
