import type { Style } from "$lib";
import { SlideObject } from "$lib/slide_objects";
import type { Position, Size } from "$lib/util";

export class Textbox extends SlideObject {
    text: string;

    constructor(position: Position, size: Size, text: string) {
        super(position, size);
        this.text = text;
    }
}

export type Fragment = { text: string, style?: Style };
