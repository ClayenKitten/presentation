import type { Color } from "./util";

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
