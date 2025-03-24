import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GameOfLifeBgComponent } from 'ngx-game-of-life-bg';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, GameOfLifeBgComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {
    run = true;
}
