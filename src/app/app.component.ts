import { Component } from '@angular/core';
import { GameOfLifeBgComponent } from 'ngx-game-of-life-bg';

@Component({
    selector: 'app-root',
    imports: [GameOfLifeBgComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {
    grid = false;
    fps = 60;
    size = 5;
    run = true;

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
}
