import { Hotkey } from "$lib/util";

export type Action = {
    name: ActionName,
    hotkey?: Hotkey,
}

export type ActionName = (typeof Actions)[number]["name"];

export function get_hotkey(action_name: ActionName): Hotkey | undefined {
    let action = Actions.find((action) => {
        let action_ = action as Action;
        return action.name == action_name;
    }) as Action | undefined;
    return action?.hotkey;
}

export function map_hotkey_to_action(hotkey: Hotkey): Action | undefined {
    return Actions.find((action) => {
        let action_ = action as Action;
        return action_.hotkey && action_.hotkey == hotkey;
    }) as Action | undefined;
}

const Actions = [
    // File
    { name: "file/new" },
    { name: "file/open" },
    { name: "file/download" },
    // Edit
    { name: "edit/undo", hotkey: new Hotkey({ ctrl: true, key: "Z" }) },
    { name: "edit/redo", hotkey: new Hotkey({ ctrl: true, key: "Y" }) },
    { name: "edit/cut", hotkey: new Hotkey({ ctrl: true, key: "X" }) },
    { name: "edit/copy", hotkey: new Hotkey({ ctrl: true, key: "C" }) },
    { name: "edit/paste", hotkey: new Hotkey({ ctrl: true, key: "V" }) },
    { name: "edit/delete", hotkey: new Hotkey({ key: "Del" }) },
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
    { name: "slide/new", hotkey: new Hotkey({ key: "M", ctrl: true }) },
    { name: "slide/duplicate" },
    { name: "slide/delete" },
    { name: "slide/background" },
    { name: "slide/transition" },
] as const;
