import "./App.css";
import React, { useRef, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import Webcam from "react-webcam";
import { drawHand } from "./utilities";
function App() {
	const camRef = useRef(null);
	const canvasRef = useRef(null);
	const canvas2Ref = useRef(null);
	useEffect(() => {
		const ctx = canvas2Ref.current.getContext("2d");
		ctx.canvas.height = 480;
		ctx.canvas.width = 680;
	}, []);

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
			// console.log(hand);
			//Draw Hand
			const ctx = canvasRef.current.getContext("2d");
			const ctx2 = canvas2Ref.current.getContext("2d");

			drawHand(hand, ctx, ctx2);
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
					// left: 0,
					zIndex: 11,
					width: 320,
					// width: 640,
					height: 240,
					// height: 480,
					textAlign: "center",
				}}
			></Webcam>
			<canvas
				ref={canvasRef}
				style={{
					position: "absolute",
					marginLeft: "auto",
					marginRight: "auto",
					right: 0,
					// left: 0,
					zIndex: 11,
					width: 320,
					// width: 640,
					height: 240,
					// height: 480,
					textAlign: "center",
				}}
			/>
			<canvas
				ref={canvas2Ref}
				style={{
					position: "relative",
					marginLeft: "auto",
					marginRight: "auto",
					zIndex: 9,
					width: 1280,
					border: 3,
					borderColor: "black",
					height: 720,
					textAlign: "center",
					backgroundColor: "whitesmoke",
					padding: 20,
				}}
			/>
		</div>
	);
}

export default App;
