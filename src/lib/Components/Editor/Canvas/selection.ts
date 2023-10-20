import type { Slide } from "$lib";
import type { SlideObject } from "$lib/Components/Editor/Canvas/slide_objects";

export type Selected =
    | ["slide", number, Slide]
    | ["object", number, SlideObject]
    | null;

export class Selection {
    private selected: Selected = null;

    public select_slide(index: number, slide: Slide) {
        this.selected = ["slide", index, slide];
    }
    public select_object(index: number, object: SlideObject) {
        this.selected = ["object", index, object];
    }
    public deselect() {
        this.selected = null;
    }

    public get selected_slide(): [number, Slide] | null {
        if (!this.selected || this.selected[0] == "object") {
            return null;
        } else {
            return [this.selected[1], this.selected[2]];
        }
    }

    public get selected_object(): [number, SlideObject] | null {
        if (!this.selected || this.selected[0] == "slide") {
            return null;
        } else {
            return [this.selected[1], this.selected[2]];
        }
    }
}
