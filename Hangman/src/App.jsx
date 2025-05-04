import { useState } from "react";
import "./App.css";
import RandomWord from "./components/api.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <RandomWord />
      </div>
    </>
  );
}

export default App;
