import type { Presentation, PresentationInfo } from "$lib";
import { Image, Textbox } from "$lib/Components/Editor/Canvas/slide_objects";

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
                    new Textbox({ x: 0, y: 0 }, { w: 200, h: 300 }, "Cats are cool!"),
                    new Image({ x: 0, y: 50 }, { w: 200, h: 200 }, new URL("https://placekitten.com/200/200")),
                    new Image({ x: 0, y: 250 }, { w: 200, h: 100 }, new URL("https://placekitten.com/350/350")),
                    new Image({ x: 0, y: 350 }, { w: 200, h: 100 }, new URL("https://placekitten.com/200/100")),
                    new Image({ x: 200, y: 50 }, { w: 200, h: 400 }, new URL("https://placekitten.com/200/400")),
                    new Image({ x: 400, y: 50 }, { w: 400, h: 400 }, new URL("https://placekitten.com/400/400")),
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
                background: new URL("https://avatars.mds.yandex.net/i?id=60847d977ae0b84c810b23fa00bbbc24f6cbec8e-8564995-images-thumbs&n=13"),
                notes: "",
                objects: [],
            },
            {
                background: "#ABC",
                notes: "",
                objects: [
                    new Image({ x: 0, y: 0 }, { w: 200, h: 300 }, new URL("https://placekitten.com/200/300")),
                ],
            },
        ]
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
            }
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
                background: new URL("https://avatars.mds.yandex.net/i?id=60847d977ae0b84c810b23fa00bbbc24f6cbec8e-8564995-images-thumbs&n=13"),
                notes: "",
                objects: [],
            }
        ],
    },
}

export function query_presentation_infos(): Record<number, PresentationInfo> {
    let infos: Record<number, PresentationInfo> = {};
    Object.keys(data).forEach(key => {
        let key_ = Number(key);
        infos[key_] = data[key_].info;
    });
    return infos;
}

export function query_presentation(id: number): Presentation | null {
    return (id in data ? data[id] : null);
}
