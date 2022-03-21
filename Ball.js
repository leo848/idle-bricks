class Ball {
	constructor(x, y, r, refs){
		this.r = r;
		this.pos = createVector(x, y);
		this.vel = createVector(random()-0.5, random()-0.5).normalize();
		this.refs = refs;
	}

	show () {
		fill("red");
		circle(this.pos.x, this.pos.y, this.r*2);
	}

	update () {
		this.pos.add(this.vel);

		if (this.pos.x+this.r > width) this.wallCollision(createVector(1,0));
		if (this.pos.x-this.r < 0) this.wallCollision(createVector(-1,0));
		if (this.pos.y+this.r > height) this.wallCollision(createVector(0, 1));
		if (this.pos.y-this.r < 0) this.wallCollision(createVector(0,-1));

		for (const brick of this.refs.bricks){
			const collision = this.collidesWith(brick);
			if (collision.x || collision.y) {
				this.brickCollision(brick, collision);
			}
		}
	}

	collidesWith (brick) {
		if (
			this.pos.x + this.r > brick.pos.x
			&& this.pos.x - this.r < brick.pos.x
			&& this.pos.y > brick.pos.y
			&& this.pos.y < brick.pos.y + brick.size.y
		)
			return createVector(-1,0);

		if (
			this.pos.x + this.r > brick.pos.x + brick.size.x
			&& this.pos.x - this.r < brick.pos.x + brick.size.x
			&& this.pos.y > brick.pos.y
			&& this.pos.y < brick.pos.y + brick.size.y
		)
			return createVector(1,0);

		if (
			this.pos.y + this.r > brick.pos.y
			&& this.pos.y - this.r < brick.pos.y
			&& this.pos.x > brick.pos.x
			&& this.pos.x < brick.pos.x + brick.size.x
		)
			return createVector(0, -1);

		if (
			this.pos.y + this.r > brick.pos.y + brick.size.y
			&& this.pos.y - this.r < brick.pos.y + brick.size.y
			&& this.pos.x > brick.pos.x
			&& this.pos.x < brick.pos.x + brick.size.x
		)
			return createVector(0, 1);

		return createVector(0, 0);

	}

	wallCollision (wall) {
		if (wall.x < 0) {
			this.pos.x = 1 + this.r;
		}
		if (wall.x > 0) {
			this.pos.x = width - this.r;
		}
		if (wall.y < 0) {
			this.pos.y = 1 + this.r; }
		if (wall.y > 0) {
			this.pos.y = height - this.r;
		}

		if (wall.x) this.vel.x *= -1;
		if (wall.y) this.vel.y *= -1;
	}

	brickCollision(brick, side) { 
		if (side.x < 0) {
			this.pos.x = - this.r + brick.pos.x;
		}
		if (side.x > 0) {
			this.pos.x = this.r + brick.pos.x + brick.size.x;
		}
		if (side.y < 0) {
			this.pos.y = -this.r + brick.pos.y;
		}
		if (side.y > 0) {
			this.pos.y = this.r + brick.pos.y + brick.size.y;
		}

		if (side.x) this.vel.x *= -1;
		if (side.y) this.vel.y *= -1;
		brick.ballCollision(this);
	}

	toString() {
		return `Ball at ${[this.pos.x, this.pos.y]}`
	}
}
