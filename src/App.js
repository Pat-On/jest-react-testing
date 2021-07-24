import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [bColor, setBColor] = useState("red");

  const newColor = bColor === "red" ? "blue" : "red";

  const handler = () => setBColor(newColor);

  return (
    <div>
      <button onClick={handler} style={{ backgroundColor: bColor }}>Change to {newColor}</button>
    </div>
  );
}

export default App;
