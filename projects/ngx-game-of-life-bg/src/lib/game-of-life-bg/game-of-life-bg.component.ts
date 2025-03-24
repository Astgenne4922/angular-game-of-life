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

@Component({
    selector: 'game-of-life-bg',
    templateUrl: './game-of-life-bg.component.html',
    styleUrls: ['./game-of-life-bg.component.css'],
})
export class GameOfLifeBgComponent implements AfterViewInit, OnDestroy {
    private golService = inject(GameOfLifeBgService);

    @ViewChild('game_of_life') canvas!: ElementRef<HTMLCanvasElement>;
    private context!: CanvasRenderingContext2D;

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

    runSimulation = input(true);

    private grid: boolean[][] = [];

    constructor() {}

    ngAfterViewInit() {
        this.context = this.canvas.nativeElement.getContext('2d')!;
        this.onResize();

        this.grid = this.golService.createGrid(this.gridX(), this.gridY());

        this.drawIntervalID = setInterval(() => this.draw(), 1000 / this.fps());
    }

    ngOnDestroy() {
        clearInterval(this.drawIntervalID);
    }

    @HostListener('window:resize')
    private onResize() {
        this.canvas.nativeElement.width = this.canvas.nativeElement.clientWidth;
        this.canvas.nativeElement.height =
            this.canvas.nativeElement.clientHeight;

        this.grid = this.golService.createGrid(this.gridX(), this.gridY());
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
        if (this.runSimulation())
            this.grid = this.golService.advanceGame(this.grid);

        this.context.fillStyle = this.backgroundColor();
        this.context.fillRect(0, 0, this.width(), this.height());

        this.drawCells();

        if (this.withGrid()) this.drawGrid();
    }

    /** Draws the grid on the canvas */
    private drawGrid() {
        this.context.strokeStyle = this.gridColor();
        this.context.beginPath();
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
        this.context.fillStyle = this.cellColor();
        this.context.shadowBlur = 10;
        this.context.shadowColor = this.cellShadow();
        for (let x = 0; x < this.gridX(); x++) {
            for (let y = 0; y < this.gridY(); y++) {
                if (this.grid[x][y]) {
                    this.context.fillRect(
                        this.cellSize() * x,
                        this.cellSize() * y,
                        this.cellSize(),
                        this.cellSize()
                    );
                }
            }
        }
    }

    /** Canvas width updated on resize */
    private width() {
        return this.canvas.nativeElement.width;
    }
    /** Grid horizontal size based on canvas width */
    private gridX() {
        return Math.ceil(this.width() / this.cellSize());
    }

    /** Canvas height updated on resize */
    private height() {
        return this.canvas.nativeElement.height;
    }
    /** Grid vertical size based on canvas height */
    private gridY() {
        return Math.ceil(this.height() / this.cellSize());
    }
}
