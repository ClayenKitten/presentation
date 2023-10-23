import type { Slide } from "$lib";
import type { SlideObject } from "$lib/Components/Editor/Canvas/slide_objects";
import type { Subscriber } from "svelte/motion";
import { writable, type Writable, derived } from "svelte/store";

export class SelectionStore {
    private selected: Writable<Selection> = writable(new Selection(null));

    public select_slide(index: number, slide: Slide) {
        this.selected.set(new Selection(["slide", index, slide]));
    }
    public select_object(index: number, object: SlideObject) {
        this.selected.set(new Selection(["object", index, object]));
    }
    public deselect() {
        this.selected.set(new Selection(null));
    }

    public subscribe(run: Subscriber<Selection>) {
        return this.selected.subscribe(run);
    }
}

export class Selection {
    private selected: SelectedData = null;

    constructor(data: SelectedData) {
        this.selected = data;
    }

    public get selected_slide() {
        if (!this.selected || this.selected[0] == "object") {
            return null;
        } else {
            return [this.selected[1], this.selected[2]] as [number, Slide];
        }
    }

    public get selected_object() {
        if (!this.selected || this.selected[0] == "slide") {
            return null;
        } else {
            return [this.selected[1], this.selected[2]] as [number, SlideObject];
        }
    }
}

type SelectedData = ["slide", number, Slide] | ["object", number, SlideObject] | null;
