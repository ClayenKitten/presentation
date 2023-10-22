import { query_presentation_infos } from "$lib/server/database";

export async function load({ params }) {
    return {
        presentations: { inner: query_presentation_infos() },
    };
}
