export class Pixel {
    state = false;
    nextState?: boolean;

    constructor(s: boolean) {
        this.state = s;
    }
}
