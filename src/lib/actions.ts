import { Hotkey } from "$lib/util";

export type Action = {
    name: ActionName,
    hotkey?: Hotkey,
}

export type ActionName = (typeof Actions)[number]["name"];

export function HotkeyHandler(event: KeyboardEvent): ActionName | undefined {
    for (let index = 0; index < Actions.length; index++) {
        const element: Action = Actions[index];
        if (element.hotkey) {
            let hotkey = element.hotkey;
            if (
                hotkey.ctrl == event.ctrlKey &&
                hotkey.shift == event.shiftKey &&
                hotkey.key == event.code
            ) {
                return element.name;
            }
        }
    }
}

export function get_hotkey(action_name: ActionName): Hotkey | undefined {
    let action = Actions.find((action) => {
        let action_ = action as Action;
        return action.name == action_name;
    }) as Action | undefined;
    return action?.hotkey;
}

const Actions = [
    // File
    { name: "file/new" },
    { name: "file/open" },
    { name: "file/download" },
    // Edit
    { name: "edit/undo", hotkey: new Hotkey("KeyZ", "Z", { ctrl: true }) },
    { name: "edit/redo", hotkey: new Hotkey("KeyY", "Y", { ctrl: true }) },
    { name: "edit/cut", hotkey: new Hotkey("KeyX", "X", { ctrl: true }) },
    { name: "edit/copy", hotkey: new Hotkey("KeyC", "C", { ctrl: true }) },
    { name: "edit/paste", hotkey: new Hotkey("KeyV", "V", { ctrl: true }) },
    { name: "edit/delete", hotkey: new Hotkey("Delete", "Del") },
    // Insert
    { name: "insert/text" },
    { name: "insert/image" },
    { name: "insert/video" },
    { name: "insert/audio" },
    { name: "insert/shapes" },
    { name: "insert/rect" },
    { name: "insert/oval" },
    { name: "insert/diamond" },
    { name: "insert/parallelogram" },
    { name: "insert/triangle" },
    { name: "insert/connection" },
    { name: "insert/connection/line" },
    { name: "insert/connection/arrow_simple" },
    { name: "insert/connection/arrow_fat" },
    { name: "insert/qr-code" },
    // Slide
    { name: "slide/new", hotkey: new Hotkey("KeyM", "M", { ctrl: true }) },
    { name: "slide/duplicate" },
    { name: "slide/delete" },
    { name: "slide/background" },
    { name: "slide/transition" },
] as const;
