import { useState } from "react";
import "./App.css";

export function replaceCamelWithSpaces(colorName) {
  // nice regular expression
  return colorName.replace(/\B([A-Z])\B/g, ' $1')
}



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
        style={{ backgroundColor: checked ?  "gray" : bColor }}
      >
        Change to {newColor}
      </button>
      <input
        type="checkbox"
        id="disable-button-checkbox"
        defaultChecked={checked}
        onChange={checkerHandler}
      />
      <label htmlFor="disable-button-checkbox">Disable button</label>
    </div>
  );
}

export default App;
