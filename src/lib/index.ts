import type { Color } from "./util";

/** The whole information about the presentation */
export type Presentation = {
    info: PresentationInfo,
    styles: Record<string, Style>,
    slides: Slide[],
}

/** Main information about presentation */
export type PresentationInfo = {
    name: string,
    author: string,
}
/** Style of text fragment */
export type Style = {
    font: string,
    size: number,
    bold: boolean,
    italic: boolean,
    underline: boolean,
    color: Color,
    background: Color | URL,
}
/** Object located on slide */
export type SlideObject = {
    kind: string,
    position: { x: number, y: number },
    size: { w: number, h: number },
}

export class Slide {
    background: Color | URL = "#FFFFFF";
    notes: string = "";
    objects: Object[] = [];
}

export type TextObj = {

}

export type ImageObj = {
    src: URL,
    alt?: string,
}

export type VideoObj = {
    src: URL,
    alt?: string,
}

export type AudioObj = {
    src: URL,
}

export type QrCode = {

}
