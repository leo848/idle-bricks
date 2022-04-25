class Level {
	constructor(string) {
		// num,xPos,yPos;num,xPos,yPos ...
		this.stringRepr = string;
		if (/\d+\*\d+(\.\d+)*/.test(string)) {
			let [lIndex, multiplier] = string.split('*');
			this.bricks = Game.levels[lIndex].bricks.slice().map((b) => {
				b = b.copy();
				b.num *= multiplier;
				return b;
			});
			return this;
		}
		let brickStrings = this.stringRepr.split(/;\s*/);
		this.bricks = [];
		brickStrings.forEach((value, index, arr) => {
			if (/\[.+?\|.+?\]/.test(value)) {
				let [cornerA, cornerB] = value.slice(1, -1).split('|');
				let [dataA, dataB] = [
					cornerA.split(/,\s*/).map((e) => parseInt(e)),
					cornerB.split(/,\s*/).map((e) => parseInt(e)),
				];

				if (dataA[1] < 0) dataA[1] += Game.canvasConfig.gridWidth - 1;
				if (dataA[2] < 0) dataA[2] += Game.canvasConfig.gridHeight - 1;
				if (dataB[1] < 0) dataB[1] += Game.canvasConfig.gridWidth - 1;
				if (dataB[2] < 0) dataB[2] += Game.canvasConfig.gridHeight - 1;

				for (let x = dataA[1]; x < dataB[1]; x++) {
					for (let y = dataA[2]; y < dataB[2]; y++) {
						let num = 
							map(
								x + y,
								dataA[1] + dataA[2],
								dataB[1] + dataB[2],
								dataA[0],
								dataB[0],
							);
						 // map numbers
						let newBrick = Brick.fromCSV(`${num},${x},${y}`);
						this.bricks.push(newBrick);
					}
				}
				return;
			}
			this.bricks[index] = Brick.fromCSV(value);
		});
	}
}
