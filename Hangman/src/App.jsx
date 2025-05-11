import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import RandomWord from "./components/Api.jsx";

function App() {
  return (
    <>
      <p>
        <RandomWord />
      </p>
    </>
  );
}

export default App;
