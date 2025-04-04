import {
    AfterViewInit,
    Component,
    effect,
    ElementRef,
    HostListener,
    input,
    ViewChild,
} from '@angular/core';
import {
    CELL_SIZE,
    COLORS,
    FPS,
    IS_EVOLVING,
    PATTERN_NAMES,
    PATTERNS,
    SHOW_GRID,
} from './game-of-life-bg.constants';
import { GameOfLife } from './game-of-life-bg.model';

/**
 * Acts as the page background displaying Conway's Game of Life on a toroidal board.
 *
 * The component takes all available space in the page while remaining underneat other components.
 * Width and height are automatically adjusted on window resize (this resets the game state creating a new board)
 *
 * A grid can be show over the board by setting the `showGrid` attribute. The grid is off by default
 * ```html
 * <game-of-life-bg showGrid="true"/>
 * ```
 *
 * Colors for the background, the cells and the grid can be set with the respective attributes
 * ```html
 * <game-of-life-bg
 *      backgroundColor="#001a44"
 *      gridColor="#ffffff"
 *      cellColor="ffffff"
 * />
 * ```
 *
 * The cells' size can be changed with the `cellSize` attribute. Changing this value causes the game state to be reset to a fresh board.
 * The size is 5 pixels by default.
 * ```html
 * <game-of-life-bg cellSize="5"/>
 * ```
 *
 * The speed of the game can be controlled with the `fps` attribute. Every frame the game state is advanced and the board is redrawn.
 * The default value is 60. The update loop is managed by `window.requestAnimationFrame` which is automatically paused by the browser
 * when the page is hidden.
 * ```html
 * <game-of-life-bg fps="60"/>
 * ```
 *
 * The game simulation can be freely started and stopped by changing the `advanceGame` attribute. By default the game starts as soon as
 * the the view is initialized in `ngAfterViewInit`
 * ```html
 * <game-of-life-bg advanceGame="true"/>
 * ```
 *
 * Unless specified changing an attribute while the game is running doesn't reset the board state.
 */
@Component({
    selector: 'game-of-life-bg',
    templateUrl: './game-of-life-bg.component.html',
    styleUrls: ['./game-of-life-bg.component.css'],
})
export class GameOfLifeBgComponent implements AfterViewInit {
    @ViewChild('game_of_life_grid')
    private gridCanvas!: ElementRef<HTMLCanvasElement>;
    @ViewChild('game_of_life_board')
    private boardCanvas!: ElementRef<HTMLCanvasElement>;
    @ViewChild('game_of_life_bg')
    private bgCanvas!: ElementRef<HTMLCanvasElement>;

    private gridContext!: CanvasRenderingContext2D;
    private boardContext!: CanvasRenderingContext2D;
    private bgContext!: CanvasRenderingContext2D;

    private then!: number;

    /** When true shows a grid on the board. Default is set to false */
    showGrid = input(SHOW_GRID);
    /** Grid color to use when drawing the grid. Default is #000000 */
    gridColor = input(COLORS.GRID);

    /** Background color. Default color is #001a44 */
    backgroundColor = input(COLORS.BACKGROUND);

    /** Cell size in pixels. Default size is 10px */
    cellSize = input(CELL_SIZE);
    /** Cell color. Default color is #ffffff */
    cellColor = input(COLORS.CELL);

    /** Frames drawn per second. Every frame the game advances and the canvas is redrawn. Default is 10 */
    fps = input(FPS);

    /** If true the game state is advanced each frame. True by default */
    advanceGame = input(IS_EVOLVING);

    private board!: GameOfLife;

    constructor() {
        effect(() => {
            if (this.showGrid() && this.gridContext) this.drawGrid();
            else if (this.gridContext)
                this.gridContext.clearRect(0, 0, this.width(), this.height());
        });

        effect(() => {
            this.resetBoard(
                Math.ceil(this.width() / this.cellSize()),
                Math.ceil(this.height() / this.cellSize())
            );
        });
    }

    ngAfterViewInit() {
        this.gridContext = this.gridCanvas.nativeElement.getContext('2d')!;
        this.boardContext = this.boardCanvas.nativeElement.getContext('2d')!;
        this.bgContext = this.bgCanvas.nativeElement.getContext('2d', {
            alpha: false,
        })!;

        this.onResize();

        this.then = window.performance.now();
        this.update();
    }

    /**
     * Adjusts the canvases size on window resize,
     * redraws the background and the grid and
     * resets the game with a fresh board
     */
    @HostListener('window:resize')
    private onResize() {
        const width = this.width();
        const height = this.height();

        this.bgCanvas.nativeElement.width = width;
        this.bgCanvas.nativeElement.height = height;

        this.boardCanvas.nativeElement.width = width;
        this.boardCanvas.nativeElement.height = height;

        this.gridCanvas.nativeElement.width = width;
        this.gridCanvas.nativeElement.height = height;

        this.bgContext.fillStyle = this.backgroundColor();
        this.bgContext.fillRect(0, 0, width, height);

        this.resetBoard(this.boardWidth(), this.boardHeight());

        if (this.showGrid()) this.drawGrid();
    }

    /** Draws and updates the simulation on the board canvas */
    private update() {
        window.requestAnimationFrame(() => this.update());

        const now = window.performance.now();
        const passed = now - this.then;

        const msPF = 1000 / this.fps();
        if (passed < msPF) return;

        const excessTime = passed % msPF;
        this.then = now - excessTime;

        if (this.advanceGame()) this.board.next();
        this.board.drawBoard(
            this.boardContext,
            this.cellSize(),
            this.cellColor()
        );
    }

    /** Draws a grid on the designated canvas */
    private drawGrid() {
        const width = this.width();
        const height = this.height();
        const cellSize = this.cellSize();

        this.gridContext.clearRect(0, 0, width, height);

        this.gridContext.beginPath();
        this.gridContext.strokeStyle = this.gridColor();
        for (let x = 0; x < width; x += cellSize) {
            this.gridContext.moveTo(x, 0);
            this.gridContext.lineTo(x, height);
        }
        for (let y = 0; y < height; y += cellSize) {
            this.gridContext.moveTo(0, y);
            this.gridContext.lineTo(width, y);
        }
        this.gridContext.stroke();
    }

    private resetBoard(width: number, height: number) {
        // this.board = GameOfLife.random(width, height);
        this.board = GameOfLife.fromRLE(
            width,
            height,
            PATTERNS[
                PATTERN_NAMES[Math.floor(Math.random() * PATTERN_NAMES.length)]
            ]
        );
    }

    /** Canvas width updated on resize */
    private width() {
        return window.innerWidth;
    }
    /** Horizontal size of the board */
    private boardWidth() {
        return Math.ceil(this.width() / this.cellSize());
    }

    /** Canvas height updated on resize */
    private height() {
        return window.innerHeight;
    }
    /** Vertical size of the board */
    private boardHeight() {
        return Math.ceil(this.height() / this.cellSize());
    }
}
