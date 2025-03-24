import { Injectable } from '@angular/core';
import { Pixel } from './game-of-life-bg.model';

@Injectable({
    providedIn: 'root',
})
export class GameOfLifeBgService {
    public createGrid(width: number, height: number): Pixel[][] {
        // let grid: boolean[][] = [];
        let grid: Pixel[][] = [];
        for (let x = 0; x < width; x++) {
            grid.push([]);
            for (let y = 0; y < height; y++) {
                grid[x].push(new Pixel(Math.random() < 0.2));
            }
        }

        return grid;
    }

    public advanceGame(current: Pixel[][]) {
        // const newGrid = [];
        const w = current.length;
        const h = current[0].length;
        // for (let x = 0; x < w; x++) newGrid.push(new Array(h).fill(false));

        for (let x = 0; x < w; x++) {
            for (let y = 0; y < h; y++) {
                let count = 0;
                for (let a = x - 1; a <= x + 1; a++) {
                    for (let b = y - 1; b <= y + 1; b++) {
                        if (
                            !(a == x && b == y) &&
                            current.at(a % w)?.at(b % h)?.state
                        )
                            count++;
                    }
                }
                // if (current[x][y]) newGrid[x][y] = count == 2 || count == 3;
                if (current[x][y].state)
                    current[x][y].nextState = count == 2 || count == 3;
                // else newGrid[x][y] = count == 3;
                else current[x][y].nextState = count == 3;
            }
        }

        current.forEach((x) => x.forEach((y) => (y.state = y.nextState!)));
        // return newGrid;
    }
}
