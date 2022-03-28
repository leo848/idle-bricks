let bricks = [];
let balls = [];

let createButtons = [];
let ballImplementations = [Ball, SniperBall, ShooterBall];

function colorMod(divident, divisor) {
	return 255 - map(divident % divisor, 0, divisor, 0, 255);
}

function setup() {
	createCanvas(600, 400);
	div = createDiv();
	noStroke();

	for (const Impl of ballImplementations) {
		createButtons.push(
			createButton(Impl.name).mousePressed(() => {
				balls.push(
					new Impl(balls.length, width / 2, height / 2, {
						bricks: bricks,
						balls: balls,
					}),
				);
			}),
		);
	}

	const BRICK_WIDTH = (width - 20 - 10 * 4) / 10,
		BRICK_HEIGHT = (height - 20 - 10 * 4) / 10;

	for (let i = 0; i < 10; i++) {
		for (let j = 0; j < 10; j++) {
			if (random() < 0.25)
				bricks.push(
					new Brick(
						bricks.length,
						20,
						10 + i * (BRICK_WIDTH + 4),
						10 + j * (BRICK_HEIGHT + 4),
						BRICK_WIDTH,
						BRICK_HEIGHT,
						{
							bricks: bricks,
							balls: balls,
						},
					),
				);
		}
	}
}

function draw() {
	background(32);

	if (balls.length > 200) {
		console.log("Collecting garbage...");
		garbageCollection(balls);
	}

	for (const ball of balls) {
		if (ball == null) continue;
		ball.update();
		ball.show();
	}

	for (const brick of bricks) {
		if (brick == null) continue;
		brick.update();
		brick.show();
	}
}

function garbageCollection(arr) {
	for (let i = 0; i < arr.length; i++) {
		if (arr[i] === null) {
			arr.splice(i, 1);
		} else console.log(arr[i]);
	}
	console.log(arr);
	for (let i = 0; i < arr.length; i++) {
		if (arr[i] === null) continue;
		arr[i].idx = i;
	}
	if (arr.length > 200) arr.length = 200;
}
