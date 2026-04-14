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
    editor: Editor,
    showToolbar: boolean
};

export default function RichMenuBar({ editor, showToolbar }: RichMenuBarPropsType) {
    const editorState = useEditorState({
        editor,
        selector: richMenuBarStateSelector
    });

    return (
        <Flex
            className={[
                styles["formatting-buttons-container"],
                !showToolbar && styles.hidden
            ].join(" ")}
            inert={!showToolbar}
            aria-hidden={!showToolbar}
            align="center"
            gap="2"
        >
            <Flex gap="1" className={styles["formatting-buttons-section"]}>
                <ActionIconButton
                    version="gray"
                    radius="large"
                    tooltip="Pogrubienie (Ctrl+B)"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    disabled={!editorState.canBold}
                    className={[
                        styles["formatting-button"],
                        editorState.isBold && styles.active,
                    ].join(" ")}
                >
                    <FontBoldIcon />
                </ActionIconButton>

                <ActionIconButton
                    version="gray"
                    radius="large"
                    tooltip="Kursywa (Ctrl+I)"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    disabled={!editorState.canItalic}
                    className={[
                        styles["formatting-button"],
                        editorState.isItalic && styles.active,
                    ].join(" ")}
                >
                    <FontItalicIcon />
                </ActionIconButton>

                <ActionIconButton
                    version="gray"
                    radius="large"
                    tooltip="Przekreślenie (Ctrl+Shift+S)"
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    disabled={!editorState.canStrike}
                    className={[
                        styles["formatting-button"],
                        editorState.isStrike && styles.active,
                    ].join(" ")}
                >
                    <StrikethroughIcon />
                </ActionIconButton>

                <ActionIconButton
                    version="gray"
                    radius="large"
                    tooltip="Podkreślenie (Ctrl+Shift+S)"
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    disabled={!editorState.canUnderline}
                    className={[
                        styles["formatting-button"],
                        editorState.isUnderline && styles.active,
                    ].join(" ")}
                >
                    <UnderlineIcon />
                </ActionIconButton>
            </Flex>

            <Separator orientation="vertical" size="1" />

            <Flex gap="1" className={styles["formatting-buttons-section"]}>
                <ActionIconButton
                    version="gray"
                    radius="large"
                    tooltip="Lista punktowana"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={[
                        styles["formatting-button"],
                        editorState.isBulletList && styles.active,
                    ].join(" ")}
                >
                    <ListBulletIcon />
                </ActionIconButton>

                <ActionIconButton
                    version="gray"
                    radius="large"
                    tooltip="Lista numerowana"
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={[
                        styles["formatting-button"],
                        editorState.isOrderedList && styles.active,
                    ].join(" ")}
                >
                    <DropdownMenuIcon />
                </ActionIconButton>
            </Flex>

            <Separator orientation="vertical" size="1" />

            <Flex gap="1" className={styles["formatting-buttons-section"]}>
                <ActionIconButton
                    version="gray"
                    radius="large"
                    tooltip="Kod"
                    onClick={() => editor.chain().focus().toggleCode().run()}
                    disabled={!editorState.canCode}
                    className={[
                        styles["formatting-button"],
                        editorState.isCode && styles.active,
                    ].join(" ")}
                >
                    <CodeIcon />
                </ActionIconButton>

                <ActionIconButton
                    version="gray"
                    radius="large"
                    tooltip="Blok kodu"
                    onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                    className={[
                        styles["formatting-button"],
                        editorState.isCodeBlock && styles.active,
                    ].join(" ")}
                >
                    <InputIcon />
                </ActionIconButton>

                <ActionIconButton
                    version="gray"
                    radius="large"
                    tooltip="Cytat"
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    className={[
                        styles["formatting-button"],
                        editorState.isBlockquote && styles.active,
                    ].join(" ")}
                >
                    <QuoteIcon />
                </ActionIconButton>

            </Flex>
        </Flex>
    )
}