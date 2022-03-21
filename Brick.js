class Brick {
	constructor(num, x, y, w, h, refs) {
		this.num = num;
		this.pos = createVector(x, y);
		this.size = createVector(w, h);
		this.refs = refs;

		textAlign(CENTER, CENTER);
	}

	update() {}

	show() {
		fill("gray");
		rect(this.pos.x, this.pos.y, this.size.x, this.size.y);
		fill("black");
		text(this.num, this.pos.x+this.size.x/2, this.pos.y+this.size.y/2);
		debug(this.num);
		
	}

	ballCollision(ball) {
		this.num--;
		if (this.num <= 0) {
			this.pos = createVector(Infinity, Infinity);
		}
	}

	toString() {
		return `"Brick at ${[this.pos.x, this.pos.y]}"`
	}
}
