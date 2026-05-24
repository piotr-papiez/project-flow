"use client";


// Functions
import { generateHTML } from "@tiptap/react";

// Extensions
import StarterKit from "@tiptap/starter-kit";

// Types
import type { JSONContent } from "@tiptap/react";

export function tiptapJsonToHtml(content: JSONContent) {
    return generateHTML(content, [
        StarterKit
    ]);
}