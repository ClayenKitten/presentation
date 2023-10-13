import type { Action } from "svelte/action";
import type { Position } from "./util";

export const draggable: Action<
    HTMLElement,
    undefined,
    { 'on:moved': (e: CustomEvent<{ offset: Position, position: Position }>) => void }
> = (node) => {
    let state = {
        dragged: false,
        start_pos: { x: 0, y: 0 },
        current_pos: { x: 0, y: 0 },
        get offset() {
            return {
                x: this.current_pos.x - this.start_pos.x,
                y: this.current_pos.y - this.start_pos.y,
            };
        }
    }

    let drag_start = (event: MouseEvent) => {
        state.dragged = true;
        state.start_pos = { x: event.pageX, y: event.pageY };
        state.current_pos = structuredClone(state.start_pos);
    }
    let drag = (event: MouseEvent) => {
        if (state.dragged) {
            state.current_pos = { x: event.pageX, y: event.pageY };
        }
    }
    let drag_end = (event: MouseEvent) => {
        if (state.dragged) {
            state.dragged = false;
            node.dispatchEvent(
                new CustomEvent("moved", {
                    detail: {
                        offset: state.offset,
                        position: { x: event.clientX, y: event.clientY },
                    }
                })
            )
        }
    }

    node.addEventListener("mousedown", drag_start);
    window.addEventListener("mousemove", drag);
    window.addEventListener("mouseup", drag_end);
    return {
        destroy() {
            node.removeEventListener("mousedown", drag_start);
            window.removeEventListener("mousemove", drag);
            window.removeEventListener("mouseup", drag_end);
        }
    };
};
