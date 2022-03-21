let bricks = [];
let balls = [];
var div;

function setup() {
	createCanvas(600, 400);
	div = createDiv();
	noStroke();

	for (let i = 0; i < 3; i++) {
		balls.push(new Ball(width / 2, height / 2, 10,{
			bricks: bricks,
			balls: balls
		}));
	}

	const BRICK_WIDTH = (width-20-10*4)/10,
		BRICK_HEIGHT = (height-20-10*4)/10

	for (let i = 0; i < 10; i++) {
		bricks.push([]);
		for (let j = 0; j < 10; j++) {
			if (random() < 0.25)
				bricks[i].push(new Brick(
					10+i*(BRICK_WIDTH+4),
					10+j*(BRICK_HEIGHT+4),
					BRICK_WIDTH,
					BRICK_HEIGHT,
					{
						bricks: bricks,
						balls: balls
					}
				));
		}
	}
}

function draw() {
	background(32);

	for (const ball of balls) {
		ball.update();
		ball.show();
	}

	for (const brickArr of bricks) {
		for (const brick of brickArr) {
			brick.update();
			brick.show();
		}
	}
}
