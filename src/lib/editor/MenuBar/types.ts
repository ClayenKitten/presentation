import type { TranslationKey } from "$lib/translation";
import type { ActionName } from "../actions/actions";

export class TopLevelEntry {
    translation_key: TranslationKey;
    children: Entry[];

    constructor(translation_key: TranslationKey, children: Entry[]) {
        this.translation_key = translation_key;
        this.children = children;
    }
}

export class Entry {
    key: ActionName;
    icon: string;
    private _children?: Entry[];

    constructor(
        key: ActionName,
        icon: string,
        children?: Entry[],
    ) {
        this.key = key;
        this.icon = icon;
        this._children = children;
    }

    public get translation_key(): TranslationKey {
        return `action/${this.key}`;
    }

    public get action_key(): string | null {
        if (this._children == undefined) {
            return this.key;
        } else {
            return null;
        }
    }

    public get children(): Entry[] {
        if (this._children) {
            return this._children;
        } else {
            return [];
        }
    }
}
