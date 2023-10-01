const translations: Record<string, Record<string, string>> = {
    en: {
        "slideshow": "Slideshow",
        "access": "Access",

        "file": "File",
        "edit": "Edit",
        "insert": "Insert",
        "slide": "Slide",

        "action/new": "New",
        "action/open": "Open",
        "action/download": "Download",
        "action/new_slide": "New slide",
        "action/duplicate_slide": "Duplicate slide",
        "action/delete_slide": "Delete slide",
        "action/background": "Background",
        "action/transition": "Transition",

        "action/undo": "Undo",
        "action/redo": "Redo",
        "action/cut": "Cut",
        "action/copy": "Copy",
        "action/paste": "Paste",
        "action/delete": "Delete",

        "action/insert/text": "Textbox",
        "action/insert/image": "Image",
        "action/insert/video": "Video",
        "action/insert/audio": "Audio",
        "action/insert/shapes": "Shape",
        "action/insert/qr-code": "QR-Code",

        "action/insert/rect": "Rectanle",
        "action/insert/oval": "Oval",
        "action/insert/diamond": "Diamond",
        "action/insert/parallelogram": "Parallelogram",
        "action/insert/triangle": "Triangle",
        "action/insert/connection": "Connection",
        "action/insert/connection/line": "Line",
        "action/insert/connection/arrow_simple": "Arrow",
        "action/insert/connection/arrow_fat": "Fat Arrow",
    },
    ru: {
        "slideshow": "Слайд-шоу",
        "access": "Доступ",

        "file": "Файл",
        "edit": "Правка",
        "insert": "Вставить",
        "slide": "Слайд",

        "action/undo": "Назад",
        "action/redo": "Вперёд",
        "action/cut": "Вырезать",
        "action/copy": "Копировать",
        "action/paste": "Вставить",
        "action/delete": "Удалить",

        "action/new": "Создать",
        "action/open": "Открыть",
        "action/download": "Скачать",
        "action/new_slide": "Новый слайд",
        "action/duplicate_slide": "Дублировать слайд",
        "action/delete_slide": "Удалить слайд",
        "action/background": "Задний фон",
        "action/transition": "Переход",

        "action/insert/text": "Текст",
        "action/insert/image": "Изображение",
        "action/insert/video": "Видео",
        "action/insert/audio": "Аудио",
        "action/insert/shapes": "Фигура",
        "action/insert/qr-code": "QR-Код",

        "action/insert/rect": "Прямоугольник",
        "action/insert/oval": "Овал",
        "action/insert/diamond": "Ромб",
        "action/insert/parallelogram": "Параллелограм",
        "action/insert/triangle": "Треугольник",
        "action/insert/connection": "Соединение",
        "action/insert/connection/line": "Линия",
        "action/insert/connection/arrow_simple": "Стрелка",
        "action/insert/connection/arrow_fat": "Толстая стрелка",
    }
}

export default function i18n(key: string, lang?: string): string {
    if (!lang) {
        lang = "en";
    }
    return translations[lang][key];
}
