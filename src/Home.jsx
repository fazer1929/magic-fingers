import React, { useState } from "react";
import SpeechRecognition, {
	useSpeechRecognition,
} from "react-speech-recognition";
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
	const { transcript, resetTranscript } = useSpeechRecognition({ commands });
	const [isSpeechOn, setIsSpeechOn] = useState(false);
	const openDoor = () => {
		console.log("Door Opened");
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
			<div className="container">
				<div className="middle">
					<button className="speakBtn" onClick={handleSpeech}>
						{isSpeechOn ? "Listening" : "Not Listening"}
					</button>
					<p className="btnText">What's the spell to open the door?</p>
					<p>
						{transcript.length > 1
							? transcript
							: "Start Listening For Transcripts"}
					</p>
				</div>
				<div className="end">
					<button>Muggles Click Here</button>
				</div>
			</div>
		</div>
	);
}