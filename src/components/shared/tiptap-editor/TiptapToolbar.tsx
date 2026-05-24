// Components
import ActionIconButton from "@/components/ui/ActionIconButton";


// Functions
import { tiptapToolbarStateSelector } from "./editor-toolbar-state";


// Material symbols
import MaterialSymbol from "@/components/ui/MaterialSymbol";


// Radix
import { Flex, Separator } from "@radix-ui/themes";


// Styles
import styles from "./TiptapEditor.module.css";


// Tiptap
import { useEditorState } from "@tiptap/react";


// Types
import type { Editor } from "@tiptap/react"


type TiptapToolbarPropsType = {
    editor: Editor,
    isToolbarVisible: boolean
};


// Main function
export default function TiptapToolbar({
    editor,
    isToolbarVisible
}: TiptapToolbarPropsType) {
    const editorState = useEditorState({
        editor,
        selector: tiptapToolbarStateSelector
    });


    return (
        <Flex
            align="center"
            aria-hidden={!isToolbarVisible}
            className={[
                styles["formatting-buttons-container"],
                !isToolbarVisible && styles.hidden
            ].join(" ")}
            gap="2"
            inert={!isToolbarVisible}
        >
            <Flex
                className={styles["formatting-buttons-section"]}
                gap="1"
            >
                <ActionIconButton
                    className={[
                        styles["formatting-button"],
                        editorState.isBold && styles.active,
                    ].join(" ")}
                    disabled={!editorState.canBold}
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    radius="large"
                    tooltip="Pogrubienie (Ctrl+B)"
                    version="gray"
                >
                    <MaterialSymbol name="format_bold" />
                </ActionIconButton>


                <ActionIconButton
                    className={[
                        styles["formatting-button"],
                        editorState.isItalic && styles.active,
                    ].join(" ")}
                    disabled={!editorState.canItalic}
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    radius="large"
                    tooltip="Kursywa (Ctrl+I)"
                    version="gray"
                >
                    <MaterialSymbol name="format_italic" />
                </ActionIconButton>


                <ActionIconButton
                    className={[
                        styles["formatting-button"],
                        editorState.isStrike && styles.active,
                    ].join(" ")}
                    disabled={!editorState.canStrike}
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    radius="large"
                    tooltip="Przekreślenie (Ctrl+Shift+S)"
                    version="gray"
                >
                    <MaterialSymbol name="strikethrough_s" />
                </ActionIconButton>


                <ActionIconButton
                    className={[
                        styles["formatting-button"],
                        editorState.isUnderline && styles.active,
                    ].join(" ")}
                    disabled={!editorState.canUnderline}
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    radius="large"
                    tooltip="Podkreślenie (Ctrl+Shift+U)"
                    version="gray"
                >
                    <MaterialSymbol name="format_underlined" />
                </ActionIconButton>
            </Flex>


            <Separator orientation="vertical" size="1" />


            <Flex
                className={styles["formatting-buttons-section"]}
                gap="1"
            >
                <ActionIconButton
                    className={[
                        styles["formatting-button"],
                        editorState.isBulletList && styles.active,
                    ].join(" ")}
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    radius="large"
                    tooltip="Lista punktowana"
                    version="gray"
                >
                    <MaterialSymbol name="format_list_bulleted" />
                </ActionIconButton>


                <ActionIconButton
                    className={[
                        styles["formatting-button"],
                        editorState.isOrderedList && styles.active,
                    ].join(" ")}
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    radius="large"
                    tooltip="Lista numerowana"
                    version="gray"
                >
                    <MaterialSymbol name="format_list_numbered" />
                </ActionIconButton>
            </Flex>


            <Separator orientation="vertical" size="1" />


            <Flex
                className={styles["formatting-buttons-section"]}
                gap="1"
            >
                <ActionIconButton
                    className={[
                        styles["formatting-button"],
                        editorState.isCode && styles.active,
                    ].join(" ")}
                    disabled={!editorState.canCode}
                    onClick={() => editor.chain().focus().toggleCode().run()}
                    radius="large"
                    tooltip="Kod"
                    version="gray"
                >
                    <MaterialSymbol name="code" />
                </ActionIconButton>


                <ActionIconButton
                    className={[
                        styles["formatting-button"],
                        editorState.isCodeBlock && styles.active,
                    ].join(" ")}
                    onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                    radius="large"
                    tooltip="Blok kodu"
                    version="gray"
                >
                    <MaterialSymbol name="code_blocks" />
                </ActionIconButton>


                <ActionIconButton
                    className={[
                        styles["formatting-button"],
                        editorState.isBlockquote && styles.active,
                    ].join(" ")}
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    radius="large"
                    tooltip="Cytat"
                    version="gray"
                >
                    <MaterialSymbol name="format_quote" />
                </ActionIconButton>
            </Flex>
        </Flex>
    );
}