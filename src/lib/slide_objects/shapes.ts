import { SlideObject } from "$lib/slide_objects";
import type { Position, Size } from "$lib/util";

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
