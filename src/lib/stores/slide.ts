import type { Slide } from "$lib";
import type {
    Location,
    SlideObject,
    SlideObjectKind,
    Textbox,
} from "$lib/Components/Editor/Canvas/slide_objects";
import type { Color } from "$lib/util";
import type { Subscriber } from "svelte/motion";
import { derived, type Writable } from "svelte/store";

/**
 * Store that manages single slide.
 */
export class SlideStore {
    private slide: Writable<Slide>;

    constructor(slide: Writable<Slide>) {
        this.slide = slide;
    }

    public change_background(background: Color) {
        this.slide.update((slide) => {
            slide.background = background;
            return slide;
        });
    }

    public get notes() {
        return {
            subscribe: derived(this.slide, (slide) => slide.notes).subscribe,
            set: (notes: string) =>
                this.slide.update((s) => {
                    s.notes = notes;
                    return s;
                }),
        };
    }

    public add_textbox() {
        let textbox: Textbox = { kind: "textbox", text: "Hello world" };
        this.add(textbox);
    }

    private add(object: SlideObjectKind) {
        this.slide.update((slide) => {
            let location: Location = {
                position: { x: 0, y: 0 },
                size: { w: 100, h: 100 },
                angle: 0,
            };
            slide.objects.push({ ...object, ...location });
            return slide;
        });
    }

    /**
     * Adds an object on slide.
     * @param object Object to insert.
     * @returns Inserted object.
     */
    public add_object(object: SlideObject): SlideObject {
        let inserted_object = structuredClone(object);
        this.slide.update((slide) => {
            slide.objects.push(inserted_object);
            return slide;
        });
        return inserted_object;
    }

    public duplicate_object(index: number) {
        this.slide.update((slide) => {
            let object = slide.objects[index];
            slide.objects.splice(index, 0, structuredClone(object));
            return slide;
        });
    }

    public delete_object(index: number) {
        this.slide.update((slide) => {
            slide.objects.splice(index, 1);
            return slide;
        });
    }

    public subscribe(run: Subscriber<Slide>) {
        return this.slide.subscribe(run);
    }
}
