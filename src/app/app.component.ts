import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GameOfLifeBgComponent, PATTERN_NAMES } from 'ngx-game-of-life-bg';

@Component({
    selector: 'app-root',
    imports: [GameOfLifeBgComponent, FormsModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {
    grid = false;
    isToroidal = true;
    fps = 60;
    size = 5;
    spawnRate = 0.3;
    run = true;
    pattern = PATTERN_NAMES[Math.floor(Math.random() * PATTERN_NAMES.length)];

    fpsUp() {
        this.fps += 5;
        if (this.fps > 60) this.fps = 60;
    }
    fpsDown() {
        this.fps -= 5;
        if (this.fps < 5) this.fps = 5;
    }

    sizeUp() {
        this.size += 5;
        if (this.size > 50) this.size = 50;
    }
    sizeDown() {
        this.size -= 5;
        if (this.size < 5) this.size = 5;
    }

    changePattern() {
        this.pattern =
            PATTERN_NAMES[Math.floor(Math.random() * PATTERN_NAMES.length)];
    }
}
