import { Slide, type Presentation } from "$lib";
import type { Subscriber } from "svelte/motion";
import { writable, type Writable, get, derived, type Updater } from "svelte/store";
import { SlideStore } from "./slide";

/**
 * Store that manages the whole presentation.
 */
export class PresentationStore {
    private presentation: Writable<Presentation>;

    constructor(presentation: Presentation) {
        this.presentation = writable(presentation);
    }

    /**
     * Method that creates custom store for provided slide index.
     * @param i Index of the slide.
     * @returns Store of slide.
     */
    public slide(i: number): SlideStore {
        let store: Writable<Slide> = {
            subscribe: derived(this.presentation, (presentation) => presentation.slides[i])
                .subscribe,
            set: (slide: Slide) => {
                this.presentation.update((p) => {
                    p.slides[i] = slide;
                    return p;
                });
            },
            update: (updater: Updater<Slide>) => {
                this.presentation.update((p) => {
                    updater(p.slides[i]);
                    return p;
                });
            },
        };
        return new SlideStore(store);
    }

    public get slide_number(): number {
        return get(this.presentation).slides.length;
    }

    public change_title(title: string) {
        this.presentation.update((presentation) => {
            presentation.info.name = title;
            return presentation;
        });
    }

    public new_slide(index: number) {
        this.presentation.update((presentation) => {
            presentation.slides.splice(index, 0, new Slide());
            return presentation;
        });
    }

    public duplicate_slide(index: number) {
        this.presentation.update((presentation) => {
            let slide = presentation.slides[index];
            presentation.slides.splice(index, 0, structuredClone(slide));
            return presentation;
        });
    }

    public delete_slide(index: number) {
        this.presentation.update((presentation) => {
            presentation.slides.splice(index, 1);
            return presentation;
        });
    }

    public subscribe(run: Subscriber<Presentation>) {
        return this.presentation.subscribe(run);
    }
}
