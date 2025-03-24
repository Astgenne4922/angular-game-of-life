import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class GameOfLifeBgService {
    public createGrid(width: number, height: number): boolean[][] {
        let grid: boolean[][] = [];
        for (let x = 0; x < width; x++) {
            grid.push([]);
            for (let y = 0; y < height; y++) {
                grid[x].push(Math.random() < 0.2);
            }
        }

        return grid;
    }

    public advanceGame(current: boolean[][]): boolean[][] {
        const newGrid = [];
        const w = current.length;
        const h = current[0].length;
        for (let x = 0; x < w; x++) newGrid.push(new Array(h).fill(false));

        for (let x = 0; x < w; x++) {
            for (let y = 0; y < h; y++) {
                let count = 0;
                for (let a = x - 1; a <= x + 1; a++) {
                    for (let b = y - 1; b <= y + 1; b++) {
                        if (!(a == x && b == y) && current.at(a % w)?.at(b % h))
                            count++;
                    }
                }
                if (current[x][y]) newGrid[x][y] = count == 2 || count == 3;
                else newGrid[x][y] = count == 3;
            }
        }

        return newGrid;
    }
}
