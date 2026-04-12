// Components
import ActionIconButton from "@/components/ui/ActionIconButton";

// Radix
import { Flex, Separator } from "@radix-ui/themes";
import {
    FontBoldIcon, FontItalicIcon, StrikethroughIcon, UnderlineIcon,
    ListBulletIcon, DropdownMenuIcon, CodeIcon, InputIcon,
    QuoteIcon
} from "@radix-ui/react-icons";

// Tiptap
import { useEditorState } from "@tiptap/react";
import type { Editor } from "@tiptap/core";

// Functions
import { richMenuBarStateSelector } from "./rich-menu-bar-state";

// Styles
import styles from "./RichContentEditor.module.css";

// Types
type RichMenuBarPropsType = {
    editor: Editor
};

export default function RichMenuBar({ editor }: RichMenuBarPropsType) {
    const editorState = useEditorState({
        editor,
        selector: richMenuBarStateSelector
    });

    return (
        <Flex align="center" gap="2" p="1" className={styles["buttons-container"]}>
            <Flex gap="1" className={styles["buttons-section"]}>
                <ActionIconButton
                    version="gray"
                    radius="large"
                    tooltip="Pogrubienie (Ctrl+B)"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    disabled={!editorState.canBold}
                    className={editorState.isBold ? styles["format-button--active"] : ""}
                >
                    <FontBoldIcon />
                </ActionIconButton>

                <ActionIconButton
                    version="gray"
                    radius="large"
                    tooltip="Kursywa (Ctrl+I)"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    disabled={!editorState.canItalic}
                    className={editorState.isItalic ? styles["format-button--active"] : ""}
                >
                    <FontItalicIcon />
                </ActionIconButton>

                <ActionIconButton
                    version="gray"
                    radius="large"
                    tooltip="Przekreślenie (Ctrl+Shift+S)"
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    disabled={!editorState.canStrike}
                    className={editorState.isStrike ? styles["format-button--active"] : ""}
                >
                    <StrikethroughIcon />
                </ActionIconButton>

                <ActionIconButton
                    version="gray"
                    radius="large"
                    tooltip="Podkreślenie (Ctrl+Shift+S)"
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    disabled={!editorState.canUnderline}
                    className={editorState.isUnderline ? styles["format-button--active"] : ""}
                >
                    <UnderlineIcon />
                </ActionIconButton>
            </Flex>

            <Separator orientation="vertical" size="1" />

            <Flex gap="1" className={styles["buttons-section"]}>
                <ActionIconButton
                    version="gray"
                    radius="large"
                    tooltip="Lista punktowana"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={editorState.isBulletList ? styles["format-button--active"] : ""}
                >
                    <ListBulletIcon />
                </ActionIconButton>

                <ActionIconButton
                    version="gray"
                    radius="large"
                    tooltip="Lista numerowana"
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={editorState.isOrderedList ? styles["format-button--active"] : ""}
                >
                    <DropdownMenuIcon />
                </ActionIconButton>
            </Flex>

            <Separator orientation="vertical" size="1" />

            <Flex gap="1" className={styles["buttons-section"]}>
                <ActionIconButton
                    version="gray"
                    radius="large"
                    tooltip="Kod"
                    onClick={() => editor.chain().focus().toggleCode().run()}
                    disabled={!editorState.canCode}
                    className={editorState.isCode ? styles["format-button--active"] : ""}
                >
                    <CodeIcon />
                </ActionIconButton>

                <ActionIconButton
                    version="gray"
                    radius="large"
                    tooltip="Blok kodu"
                    onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                    className={editorState.isCodeBlock ? styles["format-button--active"] : ""}
                >
                    <InputIcon />
                </ActionIconButton>

                <ActionIconButton
                    version="gray"
                    radius="large"
                    tooltip="Cytat"
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    className={editorState.isBlockquote ? styles["format-button--active"] : ""}
                >
                    <QuoteIcon />
                </ActionIconButton>

            </Flex>
        </Flex>
    )
}