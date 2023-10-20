import type { Style } from "$lib";
import type { Position, Size } from "$lib/util";

export class SlideObject {
    position: Position;
    size: Size;
    angle: number = 0;

    constructor(position: Position, size: Size) {
        this.position = position;
        this.size = size;
    }
}

export class Textbox extends SlideObject {
    text: string;

    constructor(position: Position, size: Size, text: string) {
        super(position, size);
        this.text = text;
    }
}

export type Fragment = { text: string, style?: Style };

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

export class QrCode extends SlideObject {
    src: URL;

    constructor(position: Position, size: Size, src: URL) {
        super(position, size);
        this.src = src;
    }
}

export module Shape {
    export class Shape extends SlideObject {
        constructor(position: Position, size: Size) {
            super(position, size);
        }
    }
    
    export class Rect extends Shape {
        constructor(position: Position, size: Size) {
            super(position, size);
        }
    }
    
    export class Oval extends Shape {
        constructor(position: Position, size: Size) {
            super(position, size);
        }
    }    
}
