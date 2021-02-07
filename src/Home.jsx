import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import SpeechRecognition, {
	useSpeechRecognition,
} from "react-speech-recognition";
import background from "./space.gif";

import { MdKeyboardVoice, MdSettingsVoice, MdTranslate } from "react-icons/md";
export default function Home() {
	const commands = [
		{
			command: "alohamora",
			callback: () => openDoor(),
			matchInterim: true,
			isFuzzyMatch: true,
		},
		{
			command: "lohamora",
			callback: () => openDoor(),
			matchInterim: true,
			isFuzzyMatch: true,
		},
		{
			command: "loha",
			callback: () => openDoor(),
			matchInterim: true,
			isFuzzyMatch: true,
		},
		{
			command: "mora",
			callback: () => openDoor(),
			matchInterim: true,
			isFuzzyMatch: true,
		},
		{
			command: "aloha",
			callback: () => openDoor(),
			matchInterim: true,
			isFuzzyMatch: true,
		},
		{
			command: "hamara",
			callback: () => openDoor(),
			matchInterim: true,
			isFuzzyMatch: true,
		},
	];
	const history = useHistory();
	const { transcript, resetTranscript } = useSpeechRecognition({ commands });
	const [isSpeechOn, setIsSpeechOn] = useState(false);
	const [seconds, setSeconds] = useState(5);
	const [doorOpen, setDoorOpen] = useState(false);
	const openDoor = () => {
		if (!doorOpen) {
			SpeechRecognition.stopListening();
			setDoorOpen(true);
			console.log("Door Opened");
			let sec = 5;
			setInterval(() => {
				sec = sec - 1;
				setSeconds(sec);
				if (sec == 0) {
					history.push("/magic");
				}
			}, 1000);
		}
	};
	if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
		return null;
	}

	const handleSpeech = () => {
		if (!isSpeechOn) {
			SpeechRecognition.startListening({ continuous: true });
		} else {
			SpeechRecognition.stopListening();
			resetTranscript();
		}
		setIsSpeechOn(!isSpeechOn);
	};
	return (
		<div className="home">
			<div
				className="container"
				style={{
					backgroundImage: `url(${background})`,
					backgroundRepeat: "no-repeat",
					backgroundSize: "cover",
					width: "100%",
					height: "100vh",
				}}
			>
				{doorOpen ? (
					<div
						style={{
							position: "absolute",
							left: "50%",
							top: "50%",
							transform: "translate(-50%,-50%)",
							color: "#fff",
							fontSize: "8rem",
							fontFamily: "sans-serif",
						}}
					>
						{seconds}
					</div>
				) : (
					<div>
						<div className="middle">
							<button className="glowBtn  speechBtn" onClick={handleSpeech}>
								{isSpeechOn ? (
									<MdSettingsVoice />
								) : (
									<MdKeyboardVoice width="60px" height="60px" />
								)}
							</button>
							<p>{isSpeechOn ? "Listening" : "Not Listening"}</p>
							<p className="btnText ">What's the spell to open the door?</p>
						</div>
						<div className="end">
							<button className="glowBtn" onClick={openDoor}>
								Muggles Click Here
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
