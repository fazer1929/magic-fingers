import React, { useRef, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import Webcam from "react-webcam";
import { drawHand } from "./utilities";
import frame from "./frame.png";
import * as fp from "fingerpose";
function Doodle() {
	const camRef = useRef(null);
	const canvasRef = useRef(null);
	const [changeColor, setChangeColor] = useState(false);
	const [ges, setGes] = useState("");
	const canvas2Ref = useRef(null);
	const runHandpose = async () => {
		const net = await handpose.load();
		console.log("hanpose Loaded");

		//Detect Hands
		// const ctx2 = canvas2Ref?.current?.getContext("2d");
		// ctx2.canvas.height = 480;
		// ctx2.canvas.width = 640;

		setInterval(() => {
			detect(net);
		}, 62);
	};
	window.onload = () => {
		const canvas = document.getElementById("canvas2");
		const ctx = canvas.getContext("2d");
		ctx.fillStyle = "#1e272e";
		ctx.fillRect(0, 0, 640, 480);
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

			if (hand.length > 0) {
				console.log(fp);
				const GE = new fp.GestureEstimator([
					fp.Gestures.VictoryGesture,
					fp.Gestures.ThumbsUpGesture,
				]);
				const gesture = await GE.estimate(hand[0].landmarks, 8);

				// console.log(gesture);
				if (gesture.gestures !== undefined && gesture.gestures.length > 0) {
					const confidence = gesture.gestures.map(
						(prediction) => prediction.confidence,
					);
					const maxConfidence = confidence.indexOf(
						Math.max.apply(null, confidence),
					);
					setGes(gesture.gestures[maxConfidence].name);
					console.log(ges);
				}
			}
			//Draw Hand
			const ctx = canvasRef.current.getContext("2d");
			const ctx2 = canvas2Ref.current.getContext("2d");

			drawHand(hand, ctx, ctx2);
		}
	};
	runHandpose();
	return (
		<div style={{ backgroundColor: "#282c3" }}>
			<div
				style={{
					color: "#fff",
					textAlign: "center",
					fontSize: "2rem",
				}}
			>
				{ges == "thumbs_up" ? "Thumbs Up It is" : ""}
				{ges == "victory" ? "You are Victorious" : ""}
			</div>
			<Webcam
				ref={camRef}
				mirrored
				style={{
					backgroundImage: `url(${frame})`,
					padding: 10,
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
				width={640}
				height={480}
				id="canvas2"
				backgroundColor="#1e272e "
				style={{
					backgroundColor: "#1e272e",
					zIndex: 9,
					width: 1280,
					border: 3,

					borderColor: "black",
					height: 720,
					textAlign: "center",
					backgroundColor: "whitesmoke",
				}}
			/>
		</div>
	);
}
export default Doodle;
