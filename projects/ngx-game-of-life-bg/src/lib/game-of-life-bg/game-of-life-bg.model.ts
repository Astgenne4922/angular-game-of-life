/**
 * Represents Conway's Game of Life with a toroidal board with sides `width` by `height`
 *
 * Each cell is represented with 5 bits and stored in 1 byte:
 * ┌───────┬─────────┬───┐
 * │ 7 6 5 │ 4 3 2 1 │ 0 │
 * └───┬───┴────┬────┴─┬─┘
 *     │        │      │
 *     │        │  Cell state
 *     │  Live neighbours count
 *  Unused
 */
export class GameOfLife {
    cells: Uint8Array;
    width: number;
    height: number;
    isToroidal: boolean;

    constructor(width: number, height: number, isToroidal = true) {
        this.width = width;
        this.height = height;
        this.cells = new Uint8Array(width * height);
        this.isToroidal = isToroidal;
    }

    /** Adavnces the game state by one generation */
    public next() {
        const clone = new Uint8Array(this.cells);

        for (let index = 0; index < clone.length; index++) {
            const isAlive = clone[index] & 1;
            const aliveNeighbor = clone[index] >>> 1;

            if (!(isAlive || aliveNeighbor)) continue;

            const nextState =
                aliveNeighbor === 3 ? 1 : aliveNeighbor === 2 ? isAlive : 0;

            if (nextState !== isAlive) {
                if (nextState) this.spawnCellbyIndex(index);
                else this.killCellbyIndex(index);
            }
        }
    }

    /** Draws the live cells on a html canvas context as squares with side of length `cellSize` using the specified `cellColor`.
     * The size of the canvas is calculated with the size of the cells array and `cellSize`
     */
    public drawBoard(
        context: CanvasRenderingContext2D,
        cellSize: number,
        cellColor: string
    ) {
        context.clearRect(0, 0, this.width * cellSize, this.height * cellSize);

        for (let index = 0; index < this.cells.length; index++) {
            if (!(this.cells[index] & 1)) continue;

            const { x, y } = this.translate1dto2d(index);
            if (cellSize >= 10) {
                context.beginPath();
                context.fillStyle = '#000000FF';
                context.rect(x * cellSize, y * cellSize, cellSize, cellSize);
                context.stroke();
            }
            context.fillStyle = cellColor;
            context.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
        }
    }

    /** Sets the selected cell as alive */
    public spawnCellbyCoord(x: number, y: number) {
        this.spawnCellbyIndex(this.translate2dto1d(x, y));
    }
    public spawnCellbyIndex(index: number) {
        this.cells[index] |= 1;
        const { x, y } = this.translate1dto2d(index);

        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                if (dx === 0 && dy === 0) continue;
                if (
                    !this.isToroidal &&
                    (x + dx < 0 ||
                        x + dx === this.width ||
                        y + dy < 0 ||
                        y + dy === this.height)
                )
                    continue;
                this.cells[this.translate2dto1d(x + dx, y + dy)] += 0b10;
            }
        }
    }

    /** Sets the selected cell as dead */
    public killCellbyCoord(x: number, y: number) {
        this.killCellbyIndex(this.translate2dto1d(x, y));
    }
    public killCellbyIndex(index: number) {
        this.cells[index] &= ~1;
        const { x, y } = this.translate1dto2d(index);

        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                if (dx === 0 && dy === 0) continue;
                if (
                    !this.isToroidal &&
                    (x + dx < 0 ||
                        x + dx === this.width ||
                        y + dy < 0 ||
                        y + dy === this.height)
                )
                    continue;
                this.cells[this.translate2dto1d(x + dx, y + dy)] -= 0b10;
            }
        }
    }

    /** Converts an index to 2-dimensional coordinates  */
    public translate1dto2d(index: number): { x: number; y: number } {
        index =
            ((index % (this.width * this.height)) + this.width * this.height) %
            (this.width * this.height);
        return { x: Math.floor(index / this.height), y: index % this.height };
    }

    /** Converts 2-dimensional cooridnate to an index */
    public translate2dto1d(x: number, y: number): number {
        return (
            (((x % this.width) + this.width) % this.width) * this.height +
            (((y % this.height) + this.height) % this.height)
        );
    }

    static random(
        width: number,
        height: number,
        { spawnRate = 0.3, isToroidal = true } = {}
    ) {
        const gol = new GameOfLife(width, height, isToroidal);

        for (let index = 0; index < gol.cells.length; index++) {
            if (Math.random() < spawnRate) gol.spawnCellbyIndex(index);
        }

        return gol;
    }

    static fromRLE(
        width: number,
        height: number,
        rle: string,
        isToroidal: boolean
    ) {
        const size_and_pattern =
            /(?:^#.*\n)*^x\s?=\s?(\d+),\s?y\s?=\s?(\d+).*\n((?:.+\n?)+)/gm;
        const run_length_tags = /\d*[bo$]/gm;

        const [, dx, dy, pattern] = size_and_pattern.exec(rle)!;

        const gol = new GameOfLife(width, height, isToroidal);

        let y = Math.floor((height - parseInt(dy)) / 2);
        let x = Math.floor((width - parseInt(dx)) / 2);

        const rules = pattern.match(run_length_tags)!;
        for (const rule of rules) {
            const c = rule.length === 1 ? 1 : parseInt(rule.slice(0, -1));

            switch (rule.at(-1)) {
                case 'b':
                    x += c;
                    break;
                case 'o':
                    for (let i = 0; i < c; i++) gol.spawnCellbyCoord(x++, y);
                    break;
                case '$':
                    x = Math.floor((width - parseInt(dx)) / 2);
                    y += c;
                    break;
            }
        }

        return gol;
    }
}
