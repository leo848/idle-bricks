class Brick {
	constructor(num, x, y, w, h, refs) {
		this.num = num;
		this.pos = createVector(x, y);
		this.size = createVector(w, h);
		this.refs = refs;
		this.highlight = false;

		textAlign(CENTER, CENTER);
		textSize(20);
	}

	update() {}

	show() {
		if (this.mouseCollision()) fill(...this.color(c => c + 50));
		else fill(...this.color());
		rect(this.pos.x, this.pos.y, this.size.x, this.size.y);
		if (this.highlight) {
			push();
			stroke(255, 0, 0);
			strokeWeight(5);
			rect(this.pos.x, this.pos.y, this.size.x, this.size.y);

			pop();
		}
		fill("black");
		text(this.num, this.pos.x+this.size.x/2, this.pos.y+this.size.y/2);
	}

	color(op) {
		let color =  [
			colorMod(this.num, 3), colorMod(this.num, 13), colorMod(this.num,23)
		];	
		if (op)
			for (let i = 0; i < color.length; i++) color[i] = op(color[i]);
		return color;
	}

	ballCollision(ball) {
		this.num--;
		if (this.num <= 0) {
			this.pos = createVector(Infinity, Infinity);
		}
	}

	mouseCollision() {
		return (
			mouseX > this.pos.x && mouseX < this.pos.x + this.size.x
			&& mouseY > this.pos.y && mouseY < this.pos.y + this.size.y
		);
	}

	toString() {
		return `"Brick at ${[this.pos.x, this.pos.y]}"`
	}
}
