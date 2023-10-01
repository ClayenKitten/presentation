export class TopLevelEntry {
    translation_key: string;
    children: Entry[];

    constructor(translation_key: string, children: Entry[]) {
        this.translation_key = translation_key;
        this.children = children;
    }
}

export class Entry {
    key: string;
    icon: string;
    private _children?: Entry[];

    constructor(
        key: string,
        icon: string,
        children?: Entry[],
    ) {
        this.key = key;
        this.icon = icon;
        this._children = children;
    }

    public get translation_key(): string {
        return "action/" + this.key;
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
