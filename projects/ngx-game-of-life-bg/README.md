<h1 align="center">Angular Game of Life Background</h1>

> Background component playing Conway's Game of Life for Angular 19+

### Demo page

[https://astgenne4922.github.io/angular-game-of-life/](https://astgenne4922.github.io/angular-game-of-life/)

## Overview

-   [Install](#install)
-   [Usage](#usage)
-   [Options](#options)

## Install

### Angular >= 19

```
npm install ngx-game-of-life-bg
```

## Usage

Add `GameOfLifeBgComponent` to your `imports`

```typescript
import { Component } from "@angular/core";
import { GameOfLifeBgComponent } from "ngx-game-of-life-bg";

@Component({
    selector: "app-root",
    imports: [GameOfLifeBgComponent],
    templateUrl: "./app.component.html",
    styleUrl: "./app.component.css",
})
export class AppComponent {}
```

And then use it in your template

```html
<game-of-life-bg [(cellSize)]="size" [(fps)]="fps" [showGrid]="grid" gridColor="#FFFFFF" [advanceGame]="run" [preset]="pattern" />
```

## Options

-   [[showGrid]](#showGrid)
-   [[gridColor]](#gridColor)
-   [[backgroundColor]](#backgroundColor)
-   [[(cellSize)]](#cellSize)
-   [[cellColor]](#cellColor)
-   [[(fps)]](#fps)
-   [[isToroidal]](#isToroidal)
-   [[spawnRate]](#spawnRate)
-   [[advanceGame]](#advanceGame)
-   [[preset]](#preset)

#### [showGrid]

| Property   | Type      | Required |
| ---------- | --------- | -------- |
| [showGrid] | _boolean_ | Optional |

If `true` a grid is displayed over the board.
The default value is `false`.

```html
<game-of-life-bg showGrid="true" />
```

#### [gridColor]

| Property    | Type     | Required |
| ----------- | -------- | -------- |
| [gridColor] | _string_ | Optional |

The color used for the grid when displayed.
Accepts only HEX color formats (`'#ffffff'`).
The default value is `'#000000'`.

```html
<game-of-life-bg gridColor="#ffffff" />
```

#### [backgroundColor]

| Property          | Type     | Required |
| ----------------- | -------- | -------- |
| [backgroundColor] | _string_ | Optional |

The color for the background of the board.
Accepts only HEX color formats (`'#ffffff'`).
The default value is `'#001a44'`.

```html
<game-of-life-bg backgroundColor="#001a44" />
```

#### [cellSize]

| Property                   | Type     | Required |
| -------------------------- | -------- | -------- |
| [cellSize] or [(cellSize)] | _number_ | Optional |

The size in pixels of the cells displayed.
Changing this value while running causes the game state to be reset.
The default value is `5`.

Supports two-way binding (see [[preset]](#preset))

```html
<game-of-life-bg cellSize="20" />
```

```html
<game-of-life-bg [(cellSize)]="size" />
```

#### [cellColor]

| Property    | Type     | Required |
| ----------- | -------- | -------- |
| [cellColor] | _string_ | Optional |

The color used for live cells.
Accepts only HEX color formats (`'#ffffff'`).
The default value is `'#ffffff'`.

```html
<game-of-life-bg cellColor="#ffffff" />
```

#### [fps]

| Property         | Type     | Required |
| ---------------- | -------- | -------- |
| [fps] or [(fps)] | _number_ | Optional |

#### [isToroidal]

| Property     | Type      | Required |
| ------------ | --------- | -------- |
| [isToroidal] | _boolean_ | Optional |

With `true` the board is treated as if opposing sides are connected, with `false` the board is treated as a closed grid and every cell outside the borders is considered dead.
The default value is `true`.

```html
<game-of-life-bg isToroidal="true" />
```

#### [spawnRate]

| Property    | Type     | Required |
| ----------- | -------- | -------- |
| [spawnRate] | _number_ | Optional |

Controls the percentage of live cells when creating a random board. The percentage is represented with values between `0` and `1`.
The default value is `0.3`.

```html
<game-of-life-bg spawnRate="0.3" />
```

#### [advanceGame]

| Property      | Type      | Required |
| ------------- | --------- | -------- |
| [advanceGame] | _boolean_ | Optional |

If `true` the game state is advanced by one step every frame.
The default value is `true`.

```html
<game-of-life-bg advanceGame="true" />
```

#### [preset]

| Property | Type     | Required |
| -------- | -------- | -------- |
| [preset] | _string_ | Optional |

#### [page]

| Property           | Type     | Required                                                                |
| ------------------ | -------- | ----------------------------------------------------------------------- |
| [page] or [(page)] | _number_ | _Required_ with [show-all]="false" or _Optional_ with [show-all]="true" |

Page number

```
[page]="1"
```

supports two way data binding as well

```
[(page)]="pageVariable"
```

If you want that the `two way data binding` actually updates your `page` variable on page change/scroll - you have to be sure that you define the height of the container, for example:

```css
pdf-viewer {
    height: 100vh;
}
```

## License

ngx-game-of-life-bg is [MIT licensed](./LICENSE).
