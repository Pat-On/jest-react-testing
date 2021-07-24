import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [bColor, setBColor] = useState("red");
  const [checked, setChecked] = useState(false);

  const newColor = bColor === "red" ? "blue" : "red";

  const handler = () => setBColor(newColor);
  const checkerHandler = () => setChecked(!checked);

  return (
    <div>
      <button
        onClick={handler}
        disabled={checked}
        style={{ backgroundColor: bColor }}
      >
        Change to {newColor}
      </button>
      <input
        type="checkbox"
        defaultChecked={checked}
        onChange={checkerHandler}
      />
    </div>
  );
}

export default App;
