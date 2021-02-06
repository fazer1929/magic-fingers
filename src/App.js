import "./App.css";
import React, { useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import Webcam from "react-webcam";
import { drawHand } from "./utilities";
function App() {
	const camRef = useRef(null);
	const canvasRef = useRef(null);
	const runHandpose = async () => {
		const net = await handpose.load();
		console.log("hanpose Loaded");
		//Detect Hands
		setInterval(() => {
			detect(net);
		}, 100);
	};
	const detect = async (net) => {
		if (
			typeof camRef.current !== "undefined" &&
			camRef.current != null &&
			camRef.current.video.readyState === 4
		) {
			// get video properties
			const video = camRef.current.video;
			const videoWidth = camRef.current.video.videoWidth;
			const videoHeight = camRef.current.video.videoHeight;
			//Set Video properties
			camRef.current.video.width = videoWidth;
			camRef.current.video.height = videoHeight;
			// set canvas properties
			canvasRef.current.width = videoWidth;
			canvasRef.current.height = videoHeight;

			//Make Detections
			const hand = await net.estimateHands(video);
			console.log(hand);
			//Draw Hand
			const ctx = canvasRef.current.getContext("2d");
			console.log(hand);
			drawHand(hand, ctx);
		}
	};
	runHandpose();
	return (
		<div>
			<Webcam
				ref={camRef}
				// mirrored
				style={{
					position: "absolute",
					marginLeft: "auto",
					marginRight: "auto",
					right: 0,
					left: 0,
					zIndex: 9,
					// width: 320,
					width: 640,
					// height: 240,
					height: 480,
					textAlign: "center",
				}}
			></Webcam>
			<canvas
				ref={canvasRef}
				style={{
					position: "absolute",
					left: 0,
					right: 0,
					marginLeft: "auto",
					marginRight: "auto",
					zIndex: 9,
					width: 640,
					height: 480,
					textAlign: "center",
				}}
			/>
		</div>
	);
}

export default App;
