import type { Slide } from "$lib";
import type { SlideObject, SlideObjectKind } from "$lib/Components/Editor/Canvas/slide_objects";
import type { Position } from "$lib/util";
import type { Subscriber } from "svelte/motion";
import { get, writable, type Writable } from "svelte/store";


export class ClipboardStore {
    private content: Writable<ClipboardContent> = writable(null);
    private times_inserted = 0;

    public put_slide(content: Slide) {
        this.times_inserted = 0;
        this.content.set(["slide", structuredClone(content)]);
    }

    public put_object(content: SlideObject) {
        this.times_inserted = 1;
        this.content.set(["object", structuredClone(content)]);
    }

    /** How much to offset an object after paste. */
    public get object_offset(): Position {
        let offset = 20;
        return { x: offset * this.times_inserted, y: offset * this.times_inserted };
    }

    /** Must be called when data from clipboard is pasted to track offset. */
    public pasted() {
        let content = get(this.content);
        if (content && content[0] == "object") {
            this.times_inserted += 1;
        }
    }

    /** Must be called when current slide changes to refresh offset. */
    public changed_slide() {
        this.times_inserted = 0;
    }

    public subscribe(run: Subscriber<ClipboardContent>) {
        return this.content.subscribe(run);
    }
}

export const clipboard = new ClipboardStore();

export type ClipboardContent = ["slide", Slide] | ["object", SlideObject] | null;
