import type { Presentation, PresentationInfo } from "$lib";

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
                objects: [],
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
                objects: [],
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
