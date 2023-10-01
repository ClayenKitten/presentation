import { SlideObject } from "$lib/slide_objects";
import type { Position, Size } from "$lib/util";

export class Image extends SlideObject {
    src: URL;

    constructor(position: Position, size: Size, src: URL) {
        super(position, size);
        this.src = src;
    }
}

export class Video extends SlideObject {
    src: URL;

    constructor(position: Position, size: Size, src: URL) {
        super(position, size);
        this.src = src;
    }
}

export class Audio extends SlideObject {
    src: URL;

    constructor(position: Position, size: Size, src: URL) {
        super(position, size);
        this.src = src;
    }
}
