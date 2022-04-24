let Game = {}; // holy game object

Game.bricks = [];
Game.balls = [];

Game.createButtons = [];
Game.ballImplementations = [Ball, SniperBall, ShooterBall];

function colorByNum(num) {
	return color(
		map(sin(num / 5), -1, 1, 10, 245),
		map(sin(num / 12 + PI / 4), -1, 1, 10, 245),
		map(sin(num / 18 - PI / 4), -1, 1, 10, 245),
	);
}

function preload() {
	loadJSON('data.json', (json) => (Game = { ...Game, ...json }));
}

function setup() {
	createCanvas(Game.canvasConfig.width, Game.canvasConfig.height);
	Game.canvasConfig.brickWidth =
		(width -
			Game.canvasConfig.edge.horizontal * 2 -
			Game.canvasConfig.gridWidth * 4) /
		Game.canvasConfig.gridWidth;
	Game.canvasConfig.brickHeight =
		(height -
			Game.canvasConfig.edge.vertical * 2 -
			Game.canvasConfig.gridHeight * 4) /
		Game.canvasConfig.gridHeight;
	console.log(Game.canvasConfig.brickWidth);
	console.log(
		width - Game.canvasConfig.edge.horizontal - Game.canvasConfig.gridWidth,
	);

	Game.levels.forEach((e, i, arr) => (arr[i] = new Level(e)));
	Game.levelIndex = 0;
	Game.bricks = Game.levels[Game.levelIndex].bricks.slice();

	div = createDiv();
	noStroke();
	colorMode(RGB);

	for (const Impl of Game.ballImplementations) {
		Game.createButtons.push(
			createButton(Impl.name).mousePressed(() => {
				Game.balls.unshift(new Impl(width / 2, height / 2));
			}),
		);
	}
}

function draw() {
	background(32);

	for (const ball of Game.balls) {
		ball.update();
		ball.show();
	}

	for (const brick of Game.bricks) {
		brick.update();
		brick.show();
	}

	if (Game.bricks.length <= 0) {
		Game.levelIndex++;
		Game.bricks = Game.levels[Game.levelIndex].bricks;
	}
}
