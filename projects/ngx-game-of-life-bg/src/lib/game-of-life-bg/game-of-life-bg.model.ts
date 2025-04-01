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

    constructor(width: number, height: number, spawnRate = 0.3) {
        this.width = width;
        this.height = height;
        this.cells = new Uint8Array(width * height);

        for (let index = 0; index < this.cells.length; index++) {
            if (Math.random() < spawnRate) this.spawnCell(index);
        }
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
                if (nextState) this.spawnCell(index);
                else this.killCell(index);
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

        context.fillStyle = cellColor;
        for (let index = 0; index < this.cells.length; index++) {
            if (!(this.cells[index] & 1)) continue;

            const { x, y } = this.translate1dto2d(index);
            context.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
        }
    }

    /** Sets the selected cell as alive */
    public spawnCell(index: number) {
        this.cells[index] |= 1;
        const { x, y } = this.translate1dto2d(index);

        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                if (dx === 0 && dy === 0) continue;
                this.cells[this.translate2dto1d(x + dx, y + dy)] += 0b10;
            }
        }
    }

    /** Sets the selected cell as dead */
    public killCell(index: number) {
        this.cells[index] &= ~1;
        const { x, y } = this.translate1dto2d(index);

        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                if (dx === 0 && dy === 0) continue;
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

    static fromRLE() {
        const rle =
            '2b3o3b3o$$o4bobo4bo$o4bobo4bo$o4bobo4bo$2b3o3b3o$$2b3o3b3o$o4bobo4bo$o4bobo4bo$o4bobo4bo$$2b3o3b3o!';
        const cells = GameOfLife.decode(rle);
        return new GameOfLife(cells.length, cells[0].length);
    }

    static decode(rle: string) {
        const rows = rle.slice(0, -1).split('$');
        const cells = [];
        let row = 0,
            numCols = 0;
        for (let i = 0; i < rows.length; i++) {
            let index = 0,
                re = /([0-9]*)(o|b)|([0-9]+)/g;
            let match;
            while ((match = re.exec(rows[i])) !== null) {
                if (!match[2]) {
                    row += parseInt(match[3]) - 1;
                    break;
                }
                const num = parseInt(match[1].length !== 0 ? match[1] : '1');
                if (match[2] === 'o') {
                    for (let col = index; col < index + num; col++)
                        cells.push([col, row]);
                }
                index += num;
                numCols = Math.max(numCols, index);
            }
            row++;
        }
        const dy = Math.floor(row / 2),
            dx = Math.floor(numCols / 2);
        const ret = [];
        for (const [x, y] of cells) ret.push([x - dx, y - dy]);
        return ret;
    }
}
