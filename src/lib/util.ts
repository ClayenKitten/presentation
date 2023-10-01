export type Color = RGB | RGBA | HEX;
export type RGB = `rgb(${number}, ${number}, ${number})`;
export type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
export type HEX = `#${string}`;

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
