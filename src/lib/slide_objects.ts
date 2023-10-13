import type { Position, Size } from "./util";

export class SlideObject {
    position: Position;
    size: Size;
    angle: number = 0;

    constructor(position: Position, size: Size) {
        this.position = position;
        this.size = size;
    }
}

export class QrCode extends SlideObject {
    src: URL;

    constructor(position: Position, size: Size, src: URL) {
        super(position, size);
        this.src = src;
    }
}
