import type { Style } from "$lib";
import type { Position, Size } from "$lib/util";

export type SlideObject = Location & SlideObjectKind;

type SlideObjectKind = Textbox | Image | Video | Audio | QrCode | Shape;

/**
 * Ensures that each `SlideObjectKind` variant has `kind` property.
 */
const guard: SlideObjectKind extends { kind: string } ? null : never = null;

export function new_slide_object(
    kind: SlideObjectKind,
    position: Position,
    size: Size,
    angle: number = 0
): SlideObject {
    return { position, size, angle, ...kind };
}

export type Location = {
    position: Position;
    size: Size;
    angle: number;
};

export type Textbox = {
    kind: "textbox";
    text: string;
};

export type Fragment = { text: string; style?: Style };

export type Image = { kind: "image"; src: string };
export type Video = { kind: "video"; src: string };
export type Audio = { kind: "audio"; src: string };
export type QrCode = { kind: "qrcode"; src: string };
export type Shape = { kind: "shape"; shape: "rect" | "oval" };
