/** The whole information about the presentation */
type Presentation = {
    info: PresentationInfo,
    styles: Record<string, Style>,
    slides: Slide[],
}

/** Main information about presentation */
type PresentationInfo = {
    name: string,
    author: string,
}
/** Style of text fragment */
type Style = {
    font: string,
    size: number,
    bold: boolean,
    italic: boolean,
    underline: boolean,
    color: Color,
    background: Color | URL,
}
/** Object located on slide */
type SlideObject = {
    kind: string,
    position: { x: number, y: number },
    size: { w: number, h: number },
}

class Slide {
    background: Color | URL = "#FFFFFF";
    notes: string = "";
    objects: Object[] = [];
}

type TextObj = {

}

type ImageObj = {
    src: URL,
    alt?: string,
}

type VideoObj = {
    src: URL,
    alt?: string,
}

type AudioObj = {
    src: URL,
}

type QrCode = {

}

// Utility types
type Color = RGB | RGBA | HEX;
type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;

export class Hotkey {
    ctrl: boolean = false;
    shift: boolean = false;
    key: string;

    constructor(init: { key: string, ctrl?: boolean, shift?: boolean }) {
        this.key = init.key;
        if (init.ctrl) {
            this.ctrl = init.ctrl;
        }
        if (init.shift) {
            this.shift = init.shift;
        }
    }
}
