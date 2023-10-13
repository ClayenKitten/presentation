export type Color = RGB | RGBA | HEX;
export type RGB = `rgb(${number}, ${number}, ${number})`;
export type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
export type HEX = `#${string}`;

export class Hotkey {
    ctrl: boolean = false;
    shift: boolean = false;
    key: string;
    display_name: string;

    constructor(key: string, display_name: string, modifiers?: { ctrl?: boolean, shift?: boolean }) {
        this.key = key;
        this.display_name = display_name;
        if (modifiers) {
            if (modifiers.ctrl) {
                this.ctrl = modifiers.ctrl;
            }
            if (modifiers.shift) {
                this.shift = modifiers.shift;
            }
        }
    }
}

export type Position = { x: number, y: number };
export type Size = { w: number, h: number };
