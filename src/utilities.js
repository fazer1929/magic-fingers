// Finger Dictionary
const fingerJoints = {
	thumb: [0, 1, 2, 3, 4],
	indexFinger: [0, 5, 6, 7, 8],
	middleFinger: [0, 9, 10, 11, 12],
	ringFinger: [0, 13, 14, 15, 16],
	pinkyFinger: [0, 17, 18, 19, 20],
};
// Infinity Gauntlet Style
const style = {
	0: { color: "yellow", size: 15 },
	1: { color: "gold", size: 6 },
	2: { color: "green", size: 10 },
	3: { color: "gold", size: 6 },
	4: { color: "gold", size: 6 },
	5: { color: "purple", size: 10 },
	6: { color: "gold", size: 6 },
	7: { color: "gold", size: 6 },
	8: { color: "gold", size: 6 },
	9: { color: "blue", size: 10 },
	10: { color: "gold", size: 6 },
	11: { color: "gold", size: 6 },
	12: { color: "gold", size: 6 },
	13: { color: "red", size: 10 },
	14: { color: "gold", size: 6 },
	15: { color: "gold", size: 6 },
	16: { color: "gold", size: 6 },
	17: { color: "orange", size: 10 },
	18: { color: "gold", size: 6 },
	19: { color: "gold", size: 6 },
	20: { color: "gold", size: 6 },
};

export const drawHand = (predictions, ctx, ctx2) => {
	if (predictions.length > 0) {
		predictions.forEach((prediction) => {
			const landmarks = prediction.landmarks;

			//Finger Loop
			for (let j = 0; j < Object.keys(fingerJoints).length; j++) {
				// var j = 1;
				let finger = Object.keys(fingerJoints)[j];
				//Loop Through Joints
				for (let k = 0; k < fingerJoints[finger].length - 1; k++) {
					//Get Pair of Joints
					// var k = 1;
					const firstJointIndex = fingerJoints[finger][k];
					const secondJointIndex = fingerJoints[finger][k + 1];

					//draw Path
					ctx.beginPath();
					ctx.moveTo(
						ctx.canvas.width - landmarks[firstJointIndex][0],
						landmarks[firstJointIndex][1],
					);
					ctx.lineTo(
						ctx.canvas.width - landmarks[secondJointIndex][0],
						landmarks[secondJointIndex][1],
					);
					ctx.strokeStyle = "indigo";
					ctx.lineWidth = 5;
					ctx.stroke();
				}
			}

			// To Draw Point
			var i = 8;
			// for (var i = 0; i < landmarks.length; i++) {
			// Get X Point
			const x = landmarks[i][0];
			// Get Y Point
			const y = landmarks[i][1];
			draw(ctx2, x, y);
			// Start Drawing
			ctx.beginPath();
			ctx.arc(ctx.canvas.width - x, y, style[i]["size"], 0, 3 * Math.PI);

			//Set line color
			ctx.fillStyle = style[i]["color"];
			ctx.fill();
			// }
		});
	}
};
function draw(ctx, j, y) {
	console.log(j, y);
	// ctx.canvas.height = 720;
	// ctx.canvas.width = 1280;
	console.log(ctx.canvas.height);
	var x = Math.abs(ctx.canvas.width - j);
	ctx.lineWidth = 2;
	ctx.lineCap = "round";
	ctx.lineTo(x, y);
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(x, y);
}
