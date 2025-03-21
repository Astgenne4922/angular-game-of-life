import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';

const SIZE = 10;
const FPS = 30;

@Component({
    selector: 'game-of-life-bg',
    templateUrl: './game-of-life-bg.component.html',
    styleUrls: ['./game-of-life-bg.component.css']
})
export class GameOfLifeBgComponent implements AfterViewInit {
    @ViewChild('game_of_life') canvas!: ElementRef<HTMLCanvasElement>;
    private context!: CanvasRenderingContext2D;

    private grid: boolean[][] = [];

    start = false;

    constructor() { }

    ngAfterViewInit() {
        this.context = this.canvas.nativeElement.getContext('2d')!;
        this.onResize();

        this.createGrid();

        setInterval(() => this.draw(), 1000 / FPS);
    }

    @HostListener('window:resize')
    private onResize() {
        this.canvas.nativeElement.width = this.canvas.nativeElement.clientWidth;
        this.canvas.nativeElement.height = this.canvas.nativeElement.clientHeight;

        this.createGrid();
    }

    private createGrid() {
        this.grid = [];
        for (let x = 0; x < Math.ceil(this.canvas.nativeElement.width / SIZE); x++) {
            this.grid.push([]);
            for (let y = 0; y < Math.ceil(this.canvas.nativeElement.height / SIZE); y++) {
                this.grid[x].push(Math.random() < .1);
            }
        }
    }

    prova() {
        this.start = !this.start;
    }

    private advanceGame() {
        const newGrid = [];
        const w = Math.ceil(this.canvas.nativeElement.width / SIZE);
        const h = Math.ceil(this.canvas.nativeElement.height / SIZE);
        for (let x = 0; x < w; x++)
            newGrid.push(new Array(h).fill(false));

        for (let x = 0; x < w; x++) {
            for (let y = 0; y < h; y++) {
                let count = 0;
                for (let a = x - 1; a <= x + 1; a++) {
                    for (let b = y - 1; b <= y + 1; b++) {
                        if (!(a == x && b == y) && this.grid.at(a % w)?.at(b % h)) count++;
                    }
                }
                if (this.grid[x][y])
                    newGrid[x][y] = count == 2 || count == 3;
                else
                    newGrid[x][y] = count == 3;
            }
        }


        this.grid = newGrid;
    }

    private draw() {
        if (this.start) this.advanceGame();

        this.context.fillStyle = '#001a44';
        this.context.fillRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);

        this.drawCells();
        // this.drawGrid();
    }

    private drawGrid() {
        this.context.strokeStyle = '#000000';
        this.context.beginPath();
        for (let x = 0; x < this.canvas.nativeElement.width; x += SIZE) {
            this.context.moveTo(x, 0);
            this.context.lineTo(x, this.canvas.nativeElement.height);
        }
        for (let y = 0; y < this.canvas.nativeElement.height; y += SIZE) {
            this.context.moveTo(0, y);
            this.context.lineTo(this.canvas.nativeElement.width, y);
        }
        this.context.stroke();
    }

    private drawCells() {
        this.context.fillStyle = 'white';
        for (let x = 0; x < this.grid.length; x++) {
            for (let y = 0; y < this.grid[x].length; y++) {
                if (this.grid[x][y]) {
                    this.context.shadowBlur = 10;
                    this.context.shadowColor = "white";
                    this.context.fillRect(SIZE * x, SIZE * y, SIZE, SIZE);
                }
            }
        }
    }

    onClickGrid(event: MouseEvent) {
        this.grid[Math.floor(event.clientX / SIZE)][Math.floor(event.clientY / SIZE)] = !this.grid[Math.floor(event.clientX / SIZE)][Math.floor(event.clientY / SIZE)];
    }
}
