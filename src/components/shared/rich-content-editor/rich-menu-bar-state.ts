import type { Editor } from "@tiptap/core";
import type { EditorStateSnapshot } from "@tiptap/react";

export function richMenuBarStateSelector(ctx: EditorStateSnapshot<Editor>) {
    return {
        isBold: ctx.editor.isActive("bold") ?? false,
        canBold: ctx.editor.can().chain().toggleBold().run() ?? false,

        isItalic: ctx.editor.isActive("italic") ?? false,
        canItalic: ctx.editor.can().chain().toggleItalic().run() ?? false,

        isStrike: ctx.editor.isActive("strike") ?? false,
        canStrike: ctx.editor.can().chain().toggleStrike().run() ?? false,

        isUnderline: ctx.editor.isActive("underline") ?? false,
        canUnderline: ctx.editor.can().chain().toggleUnderline().run() ?? false,

        isCode: ctx.editor.isActive("code") ?? false,
        canCode: ctx.editor.can().chain().toggleCode().run() ?? false,

        canClearMarks: ctx.editor.can().chain().unsetAllMarks().run() ?? false,

        isBulletList: ctx.editor.isActive("bulletList") ?? false,
        isOrderedList: ctx.editor.isActive("orderedList") ?? false,

        isCodeBlock: ctx.editor.isActive("codeBlock") ?? false,

        isBlockquote: ctx.editor.isActive("blockquote") ?? false,

        canUndo: ctx.editor.can().chain().undo().run() ?? false,
        canRedo: ctx.editor.can().chain().redo().run() ?? false
    }
}

export type RichMenuBarStateSelectorType = ReturnType<typeof richMenuBarStateSelector>;