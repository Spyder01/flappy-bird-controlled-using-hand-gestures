// 0. Install fingerpose npm install fingerpose
// 1. Add Use State
// 2. Import emojis and finger pose import * as fp from "fingerpose";
// 3. Setup hook and emoji object
// 4. Update detect function for gesture handling
// 5. Add emoji display to the screen

///////// NEW STUFF ADDED USE STATE
import React, { useRef, useState, useEffect } from "react";
///////// NEW STUFF ADDED USE STATE

// import logo from './logo.svg';
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import Webcam from "react-webcam";
import { drawHand } from "../utilities";

import * as fp from "fingerpose";
import victory from "../victory.png";
import thumbs_up from "../thumbs_up.png";


function App({height, width, setGesture, setStarted, started}) {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);


  const [emoji, setEmoji] = useState(null);
  const images = { thumbs_up: thumbs_up, victory: victory };


  const runHandpose = async () => {
    const net = await handpose.load();
    console.log("Handpose model loaded.");
    
    //  Loop and detect hands

    setInterval(() => {
      detect(net);
    }, 10);
  };


  useEffect(() => {
      if (emoji !== null && !started)
        setStarted (true)
  }, [emoji])
  const detect = async (net) => {
    // Check data is available

    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {

      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Make Detections
      const hand = await net.estimateHands(video);
      // console.log(hand);


      if (hand.length > 0) {
        const GE = new fp.GestureEstimator([
          fp.Gestures.VictoryGesture,
          fp.Gestures.ThumbsUpGesture,
        ]);
        const gesture = await GE.estimate(hand[0].landmarks, 4);
        if (gesture.gestures !== undefined && gesture.gestures.length > 0) {
          // console.log(gesture.gestures);

          const confidence = gesture.gestures.map(
            (prediction) => prediction.confidence
          );
          const maxConfidence = confidence.indexOf(
            Math.max.apply(null, confidence)
          );
          // console.log(gesture.gestures[maxConfidence].name);
          setEmoji(gesture.gestures[maxConfidence].name);
          setGesture (gesture.gestures[maxConfidence].name)
          console.log (gesture.gestures[maxConfidence].name)
        
        }
      }

      const ctx = canvasRef.current.getContext("2d");
      drawHand(hand, ctx);
    }
  };

  useEffect(()=>{runHandpose()},[]);

  return (
    <div className="CamScreen">
      <header className="App-header">
        <Webcam
          ref={webcamRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            bottom: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 320,
            height: 200,
          }}
        />

        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 320,
            height: 200,
          }}
        />
        {
        (()=>{
        if (emoji !== null)
           setStarted (true)
        }
      ) () }
        {emoji !== null ? (
            <h1 style={{color: "red"}}>Ready!!!</h1>
            
        ) : (
          ""
        )}

        {}
      </header>
    </div>
  );
}

export default App;
