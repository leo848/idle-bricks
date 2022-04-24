class Brick {
	constructor(num, x, y) {
		this.x = x;
		this.y = y;
		this.num = num;
		this.pos = createVector(
			Game.canvasConfig.edge.horizontal +
				this.x *
					(Game.canvasConfig.brickWidth +
						Game.canvasConfig.innerEdge.horizontal),

			Game.canvasConfig.edge.vertical +
				this.y *
					(Game.canvasConfig.brickHeight +
						Game.canvasConfig.innerEdge.vertical),
		);
		this.size = createVector(
			Game.canvasConfig.brickWidth,
			Game.canvasConfig.brickHeight,
		);
		this.highlight = false;

		textAlign(CENTER, CENTER);
		textSize(20);
	}

	update() {}

	show() {
		// if (this.mouseCollision()) fill(...this.color((c) => c + 50));
		/* else */ fill(colorByNum(this.num));
		rect(this.pos.x, this.pos.y, this.size.x, this.size.y);
		if (this.highlight) {
			push();
			stroke(255, 0, 0);
			strokeWeight(5);
			rect(this.pos.x, this.pos.y, this.size.x, this.size.y);

			pop();
		}
		fill('black');
		text(this.num, this.pos.x + this.size.x / 2, this.pos.y + this.size.y / 2);
	}

	ballCollision(ball) {
		this.num--;
		if (this.num <= 0) {
			// delete this element
			this.remove();
		}
	}

	remove() {
		Game.bricks = Game.bricks.filter((b) => b !== this);
	}

	mouseCollision() {
		return (
			mouseX > this.pos.x &&
			mouseX < this.pos.x + this.size.x &&
			mouseY > this.pos.y &&
			mouseY < this.pos.y + this.size.y
		);
	}

	static fromCSV(values) {
		let data = values.split(/,\s*/).map((e) => Number(e));
		console.group()
		console.log(...data);
		if (data[1] < 0) data[1] += Game.canvasConfig.gridWidth;
		if (data[2] < 0) data[2] += Game.canvasConfig.gridHeight;
		console.log(...data);
		console.groupEnd();
		return new Brick(data[0], data[1], data[2]);
	}

	toString() {
		return `"Brick at ${[this.pos.x, this.pos.y]}"`;
	}
}
