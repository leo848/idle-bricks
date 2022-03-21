class Brick {
	constructor(x, y, w, h, refs) {
		this.pos = createVector(x, y);
		this.size = createVector(w, h);
		this.refs = refs;
	}

	update() {}

	show() {
		fill("gray");
		rect(this.pos.x, this.pos.y, this.size.x, this.size.y);
	}

	toString() {
		return `"Brick at ${[this.pos.x, this.pos.y]}"`
	}
}
