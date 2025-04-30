<h1 align="center">Angular Game of Life Background</h1>

> Background component playing Conway's Game of Life for Angular 19+

### Demo page

[https://astgenne4922.github.io/ng-game-of-life/](https://astgenne4922.github.io/ng-game-of-life/)

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
<ngx-game-of-life-bg cellSize="5" fps="60" showGrid="true" gridColor="#FFFFFF" advanceGame="true" preset="lightspeedoscillator3" />
```

## Options

-   [[showGrid]](#showGrid)
-   [[gridColor]](#gridColor)
-   [[backgroundColor]](#backgroundColor)
-   [[cellSize]](#cellSize)
-   [[cellColor]](#cellColor)
-   [[fps]](#fps)
-   [[isToroidal]](#isToroidal)
-   [[spawnRate]](#spawnRate)
-   [[advanceGame]](#advanceGame)
-   [[preset]](#preset)

#### [showGrid]

| Property   | Type      | Required  | Default |
| ---------- | --------- | --------- | ------- |
| [showGrid] | _boolean_ | _Optonal_ | `false` |

If `true` a grid is displayed over the board.

```html
<ngx-game-of-life-bg showGrid="true" />
```

#### [gridColor]

| Property    | Type     | Required  | Default   |
| ----------- | -------- | --------- | --------- |
| [gridColor] | _string_ | _Optonal_ | `#000000` |

The color used for the grid when displayed.
Accepts only HEX color formats (`#ffffff`).

```html
<ngx-game-of-life-bg gridColor="#ffffff" />
```

#### [backgroundColor]

| Property          | Type     | Required  | Default   |
| ----------------- | -------- | --------- | --------- |
| [backgroundColor] | _string_ | _Optonal_ | `#001a44` |

The color for the background of the board.
Accepts only HEX color formats (`#ffffff`).

```html
<ngx-game-of-life-bg backgroundColor="#001a44" />
```

#### [cellSize]

| Property   | Type     | Required  | Default |
| ---------- | -------- | --------- | ------- |
| [cellSize] | _number_ | _Optonal_ | `5`     |

The size in pixels of the cells displayed.
Changing this value while running causes the game state to be reset.

```html
<ngx-game-of-life-bg cellSize="20" />
```

#### [cellColor]

| Property    | Type     | Required  | Default   |
| ----------- | -------- | --------- | --------- |
| [cellColor] | _string_ | _Optonal_ | `#ffffff` |

The color used for live cells.
Accepts only HEX color formats (`#ffffff`).

```html
<ngx-game-of-life-bg cellColor="#ffffff" />
```

#### [fps]

| Property | Type     | Required  | Default |
| -------- | -------- | --------- | ------- |
| [fps]    | _number_ | _Optonal_ | `60`    |

The framerate of the simulation. Every frame the game is advanced by 1 step and the board is redrawn.

```html
<ngx-game-of-life-bg fps="20" />
```

#### [isToroidal]

| Property     | Type      | Required  | Default |
| ------------ | --------- | --------- | ------- |
| [isToroidal] | _boolean_ | _Optonal_ | `true`  |

With `true` the board is treated as if opposing sides are connected, with `false` the board is treated as a closed grid and every cell outside the borders is considered dead.
Changing this value while running causes the game state to be reset.

```html
<ngx-game-of-life-bg isToroidal="true" />
```

#### [spawnRate]

| Property    | Type     | Required  | Default |
| ----------- | -------- | --------- | ------- |
| [spawnRate] | _number_ | _Optonal_ | `0.3`   |

Controls the percentage of live cells when creating a random board. The percentage is represented with values between `0` and `1`.
Changing this value while running causes the game state to be reset.

```html
<ngx-game-of-life-bg spawnRate="0.3" />
```

#### [advanceGame]

| Property      | Type      | Required  | Default |
| ------------- | --------- | --------- | ------- |
| [advanceGame] | _boolean_ | _Optonal_ | `true`  |

If `true` the game state is advanced by one step every frame.

```html
<ngx-game-of-life-bg advanceGame="true" />
```

#### [preset]

| Property | Type     | Required  | Default |
| -------- | -------- | --------- | ------- |
| [preset] | _string_ | _Optonal_ | `''`    |

Setting this attribute to a valid preset name specifies automatically a value for `cellSize`, `fps`, and `isToroidal` if they haven't been already set and creates the initial board state from a determined pattern.
If `preset` is invalid the board is created with random live cells.
Changing this value while running causes the game state to be reset.

A list of every valid pattern name can be found in `PATTERN_NAMES`. Simply import it in your component file.

```typescript
import { PATTERN_NAMES } from "ngx-game-of-life-bg";
```

```html
<ngx-game-of-life-bg preset="lightspeedoscillator3" />
```

## License

ngx-game-of-life-bg is [MIT licensed](./LICENSE).
