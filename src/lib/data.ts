import type { Presentation, PresentationInfo } from "$lib";
import {
    type Textbox,
    new_slide_object,
    type Image,
    type Shape,
} from "$lib/Components/Editor/Canvas/slide_objects";

const data: Record<number, Presentation> = {
    25: {
        info: {
            name: "Pres1",
            author: "SuperAuthor",
        },
        styles: {},
        slides: [
            {
                background: "#FFF",
                notes: "egeg@",
                objects: [
                    new_slide_object(
                        { kind: "textbox", text: "Cats are cool!" },
                        { x: 0, y: 0 },
                        { w: 200, h: 200 }
                    ),
                    new_slide_object(
                        { kind: "image", src: "https://placekitten.com/200/200" },
                        { x: 0, y: 50 },
                        { w: 200, h: 200 }
                    ),
                    new_slide_object(
                        { kind: "image", src: "https://placekitten.com/350/350" },
                        { x: 0, y: 250 },
                        { w: 200, h: 100 }
                    ),
                    new_slide_object(
                        { kind: "image", src: "https://placekitten.com/200/100" },
                        { x: 0, y: 350 },
                        { w: 200, h: 100 }
                    ),
                    new_slide_object(
                        { kind: "image", src: "https://placekitten.com/200/400" },
                        { x: 200, y: 50 },
                        { w: 200, h: 400 }
                    ),
                    new_slide_object(
                        { kind: "image", src: "https://placekitten.com/400/400" },
                        { x: 400, y: 50 },
                        { w: 400, h: 400 }
                    ),
                ],
            },
            {
                background: "#AFA",
                notes: "",
                objects: [],
            },
            {
                background: "#FFA",
                notes: "",
                objects: [],
            },
            {
                background: "#0FAA0F",
                notes: "",
                objects: [],
            },
            {
                background:
                    "url(https://avatars.mds.yandex.net/i?id=60847d977ae0b84c810b23fa00bbbc24f6cbec8e-8564995-images-thumbs&n=13)",
                notes: "",
                objects: [],
            },
            {
                background: "#ABC",
                notes: "",
                objects: [
                    new_slide_object(
                        { kind: "shape", shape: "rect" },
                        { x: 150, y: 0 },
                        { w: 200, h: 300 }
                    ),
                    new_slide_object(
                        { kind: "image", src: "https://placekitten.com/200/300" },
                        { x: 0, y: 0 },
                        { w: 200, h: 200 }
                    ),
                ],
            },
        ],
    },
    127: {
        info: {
            name: "Pres2",
            author: "SuperAuthor",
        },
        styles: {},
        slides: [
            {
                background: "#FFF",
                notes: "Empty slide!",
                objects: [],
            },
        ],
    },
    512: {
        info: {
            name: "Pres3",
            author: "SuperAuthor",
        },
        styles: {},
        slides: [
            {
                background:
                    "url(https://avatars.mds.yandex.net/i?id=60847d977ae0b84c810b23fa00bbbc24f6cbec8e-8564995-images-thumbs&n=13)",
                notes: "",
                objects: [],
            },
        ],
    },
};

export function query_presentation_infos(): Record<number, PresentationInfo> {
    let infos: Record<number, PresentationInfo> = {};
    Object.keys(data).forEach((key) => {
        let key_ = Number(key);
        infos[key_] = data[key_].info;
    });
    return infos;
}

export function query_presentation(id: number): Presentation | null {
    return id in data ? data[id] : null;
}
