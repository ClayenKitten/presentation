import { get, writable, type Writable } from "svelte/store";
import type { ActionName } from "./editor/actions/actions";

type Language = "en" | "ru";

/** Type that ensures translation to all languages */
type Translations = {
    en: string,
    ru: string,
}

export type TranslationKey = keyof typeof translations;

export const language: Writable<Language> = writable("ru");

export default function i18n(key: TranslationKey): string {
    return translations[key][get(language)];
}

const translations = {
    "slideshow": {
        en: "Slideshow",
        ru: "Слайд-шоу",
    },
    "access": {
        en: "Access",
        ru: "Доступ",
    },
    // Menu
    "file": {
        en: "File",
        ru: "Файл",
    },
    "edit": {
        en: "Edit",
        ru: "Правка",
    },
    "insert": {
        en: "Insert",
        ru: "Вставка",
    },
    "slide": {
        en: "Slide",
        ru: "Слайд",
    },
    // Menu > File
    "action/file/new": {
        en: "New",
        ru: "Создать",
    },
    "action/file/open": {
        en: "Open",
        ru: "Открыть",
    },
    "action/file/download": {
        en: "Download",
        ru: "Скачать",
    },
    // Menu > Slide
    "action/slide/new": {
        en: "New slide",
        ru: "Новый слайд",
    },
    "action/slide/duplicate": {
        en: "Duplicate slide",
        ru: "Дублировать слайд",
    },
    "action/slide/delete": {
        en: "Delete slide",
        ru: "Удалить слайд",
    },
    "action/slide/background": {
        en: "Background",
        ru: "Задний фон",
    },
    "action/slide/transition": {
        en: "Transition",
        ru: "Переход",
    },
    // Menu > Edit
    "action/edit/undo": {
        en: "Undo",
        ru: "Назад",
    },
    "action/edit/redo": {
        en: "Redo",
        ru: "Вперёд",
    },
    "action/edit/cut": {
        en: "Cut",
        ru: "Вырезать",
    },
    "action/edit/copy": {
        en: "Copy",
        ru: "Копировать",
    },
    "action/edit/paste": {
        en: "Paste",
        ru: "Вставить",
    },
    "action/edit/delete": {
        en: "Delete",
        ru: "Удалить",
    },
    // Menu > Insert
    "action/insert/text": {
        en: "Text box",
        ru: "Текст",
    },
    "action/insert/image": {
        en: "Image",
        ru: "Изображение",
    },
    "action/insert/video": {
        en: "Video",
        ru: "Видео",
    },
    "action/insert/audio": {
        en: "Audio",
        ru: "Аудио",
    },
    "action/insert/shapes": {
        en: "Shape",
        ru: "Фигура",
    },
    "action/insert/qr-code": {
        en: "QR-Code",
        ru: "QR-код",
    },
    // Menu > Insert> Shape
    "action/insert/rect": {
        en: "Rectanle",
        ru: "Прямоугольник",
    },
    "action/insert/oval": {
        en: "Oval",
        ru: "Овал",
    },
    "action/insert/diamond": {
        en: "Diamond",
        ru: "Ромб",
    },
    "action/insert/parallelogram": {
        en: "Parallelogram",
        ru: "Параллелограм",
    },
    "action/insert/triangle": {
        en: "Triangle",
        ru: "Треугольник",
    },
    "action/insert/connection": {
        en: "Connection",
        ru: "Соединение",
    },
    "action/insert/connection/line": {
        en: "Line",
        ru: "Линия",
    },
    "action/insert/connection/arrow_simple": {
        en: "Arrow",
        ru: "Стрелка",
    },
    "action/insert/connection/arrow_fat": {
        en: "Fat Arrow",
        ru: "Толстая стрелка",
    },
};
