// 0. Install fingerpose npm install fingerpose
// 1. Add Use State
// 2. Import emojis and finger pose import * as fp from "fingerpose";
// 3. Setup hook and emoji object
// 4. Update detect function for gesture handling
// 5. Add emoji display to the screen

///////// NEW STUFF ADDED USE STATE
import React, { useRef, useState, useEffect } from "react";
import CamScreen from './components/handgesture';
import Game from './components/Game'

///////// NEW STUFF ADDED USE STATE


import "./App.css";


function App() {
  const [gesture, setGesture] = useState ("victory");
  const [started, setStarted] = useState (false)

  return (
    <div className="App">
      <Game gesture={gesture} started={started}/>
      <CamScreen width="" height=""  setGesture={setGesture} setStarted={setStarted} started={started} />
    </div>
  );
}

export default App;
