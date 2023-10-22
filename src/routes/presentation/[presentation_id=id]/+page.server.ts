import { query_presentation } from "$lib/server/database";
import { error } from "@sveltejs/kit";

export async function load({ params }) {
    let id = parseInt(params.presentation_id);
    let presentation = await query_presentation(id);
    if (presentation == null) {
        throw error(404);
    }
    return { presentation };
}
