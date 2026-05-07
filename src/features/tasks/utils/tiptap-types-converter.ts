// Functions
import { generateHTML } from "@tiptap/react";

// Extensions
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";

// Types
import type { JSONContent } from "@tiptap/react";

export function tiptapJsonToHtml(content: JSONContent) {
    return generateHTML(content, [
        StarterKit,
        Underline
    ]);
}