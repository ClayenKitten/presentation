import type { SlideObject } from "./slide_objects";
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

export class Slide {
    background: Color | URL = "#FFFFFF";
    notes: string = "";
    objects: SlideObject[] = [];
}
