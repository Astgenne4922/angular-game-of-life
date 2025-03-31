import {
    AfterViewInit,
    Component,
    ElementRef,
    HostListener,
    inject,
    input,
    OnDestroy,
    ViewChild,
} from '@angular/core';
import { GameOfLifeBgService } from './game-of-life-bg.service';
import { CELL_SIZE, COLORS, FPS } from './game-of-life-bg.constants';
import { GameOfLife, Pixel } from './game-of-life-bg.model';

@Component({
    selector: 'game-of-life-bg',
    templateUrl: './game-of-life-bg.component.html',
    styleUrls: ['./game-of-life-bg.component.css'],
})
export class GameOfLifeBgComponent implements AfterViewInit, OnDestroy {
    private golService = inject(GameOfLifeBgService);

    @ViewChild('game_of_life') canvas!: ElementRef<HTMLCanvasElement>;
    @ViewChild('game_of_life_bg') prova!: ElementRef<HTMLCanvasElement>;
    private context!: CanvasRenderingContext2D;
    private provaCon!: CanvasRenderingContext2D;

    private drawIntervalID!: ReturnType<typeof setInterval>;

    /** If true draws the canvas grid. Default is set to false */
    withGrid = input(false);
    /** Grid color to use when drawing the grid. Default is #000000 */
    gridColor = input(COLORS.GRID);

    /** Background color. Default color is #001a44 */
    backgroundColor = input(COLORS.BACKGROUND);

    /** Cell size in pixels. Default size is 10px */
    cellSize = input(CELL_SIZE);
    /** Cell color. Default color is #ffffff */
    cellColor = input(COLORS.CELL);
    /** Cell shadow. Set a alpha of 0 for no shadow. Default color is #ffffff */
    cellShadow = input(COLORS.CELL_SHADOW);

    /** Frames drawn per second. Every frame the game advances and the canvas is redrawn. Default is 10 */
    fps = input(FPS);
    then!: number;

    runSimulation = input(true);

    // private grid: boolean[][] = [];
    private grid: Pixel[][] = [];
    private board!: GameOfLife;

    constructor() {}

    ngAfterViewInit() {
        this.context = this.canvas.nativeElement.getContext('2d')!;
        this.provaCon = this.prova.nativeElement.getContext('2d')!;
        this.onResize();

        this.grid = this.golService.createGrid(this.gridX(), this.gridY());
        this.board = new GameOfLife(this.gridX(), this.gridY());

        // this.drawIntervalID = setInterval(() => this.draw(), 1000 / this.fps());
        this.then = window.performance.now();
        this.draw();
    }

    ngOnDestroy() {
        clearInterval(this.drawIntervalID);
    }

    @HostListener('window:resize')
    private onResize() {
        this.canvas.nativeElement.width = this.width();
        this.canvas.nativeElement.height = this.height();
        this.prova.nativeElement.width = this.width();
        this.prova.nativeElement.height = this.height();
        // this.canvas.nativeElement.width = this.gridX();
        // this.canvas.nativeElement.height = this.gridY();

        this.provaCon.fillStyle = this.backgroundColor();
        this.provaCon.fillRect(0, 0, this.width(), this.height());

        this.grid = this.golService.createGrid(this.gridX(), this.gridY());
        this.board = new GameOfLife(this.gridX(), this.gridY());
    }

    @HostListener('document:visibilitychange')
    private onVisibilityChange() {
        if (document.hidden) clearInterval(this.drawIntervalID);
        else
            this.drawIntervalID = setInterval(
                () => this.draw(),
                1000 / this.fps()
            );
    }

    /** Draws and updates the simulation on the canvas */
    private draw() {
        window.requestAnimationFrame(() => this.draw());

        // if (this.runSimulation()) this.golService.advanceGame(this.grid);
        // this.grid = this.golService.advanceGame(this.grid);

        // this.image();
        // this.context.fillStyle = this.backgroundColor();
        // this.context.fillRect(0, 0, this.width(), this.height());
        // this.context.clearRect(0, 0, this.width(), this.height());
        // this.drawCells();

        const now = window.performance.now();
        const passed = now - this.then;

        if (passed < 1000 / this.fps()) return;

        const excessTime = passed % (1000 / this.fps());
        this.then = now - excessTime;

        if (this.runSimulation()) this.board.next();
        this.drawBoard();
        if (this.withGrid()) this.drawGrid();
    }

    private drawBoard() {
        this.context.clearRect(0, 0, this.width(), this.height());

        this.context.fillStyle = this.cellColor();
        this.board.cells.forEach((cell, index) => {
            if (cell & 1) {
                const [row, column] = this.board.translate1dto2d(index);
                this.context.fillRect(
                    row * this.cellSize(),
                    column * this.cellSize(),
                    this.cellSize(),
                    this.cellSize()
                );
            }
        });
    }

    private async image() {
        const w = this.gridX();
        const h = this.gridY();
        const image = this.context.createImageData(w, h);

        const cell = this.cellColor()
            .replace('#', '')
            .match(/(.{2})/g)
            ?.map((e) => parseInt(e, 16))!;

        const bg = this.backgroundColor()
            .replace('#', '')
            .match(/(.{2})/g)
            ?.map((e) => parseInt(e, 16))!;

        for (let x = 0; x < w; x++) {
            for (let y = 0; y < h; y++) {
                const i = (y * w + x) * 4;
                image.data[i] = this.grid[x][y].state ? cell[0] : bg[0];
                image.data[i + 1] = this.grid[x][y].state ? cell[1] : bg[1];
                image.data[i + 2] = this.grid[x][y].state ? cell[2] : bg[2];
                image.data[i + 3] = 255;
            }
        }
        this.context.putImageData(image, 0, 0);
    }

    /** Draws the grid on the canvas */
    private drawGrid() {
        this.context.beginPath();
        this.context.strokeStyle = this.gridColor();
        for (let x = 0; x < this.width(); x += this.cellSize()) {
            this.context.moveTo(x, 0);
            this.context.lineTo(x, this.height());
        }
        for (let y = 0; y < this.height(); y += this.cellSize()) {
            this.context.moveTo(0, y);
            this.context.lineTo(this.width(), y);
        }
        this.context.stroke();
    }

    /** Draws every cell of the grid in the canvas */
    private drawCells() {
        this.context.beginPath();
        this.context.fillStyle = this.cellColor();
        this.context.shadowBlur = 10;
        this.context.shadowColor = this.cellShadow();
        for (let x = 0; x < this.gridX(); x++) {
            for (let y = 0; y < this.gridY(); y++) {
                if (this.grid[x][y].state) {
                    this.context.fillRect(
                        this.cellSize() * x,
                        this.cellSize() * y,
                        this.cellSize(),
                        this.cellSize()
                    );
                }
            }
        }
        this.context.stroke();
    }

    /** Canvas width updated on resize */
    private width() {
        return this.canvas.nativeElement.clientWidth;
    }
    /** Grid horizontal size based on canvas width */
    private gridX() {
        return Math.ceil(this.width() / this.cellSize());
    }

    /** Canvas height updated on resize */
    private height() {
        return this.canvas.nativeElement.clientHeight;
    }
    /** Grid vertical size based on canvas height */
    private gridY() {
        return Math.ceil(this.height() / this.cellSize());
    }
}
