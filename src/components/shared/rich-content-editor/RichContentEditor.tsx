"use client";

// Components
import RichMenuBar from "./RichMenuBar";
import ActionIconButton from "@/components/ui/ActionIconButton";

// Radix
import { Flex, Separator } from "@radix-ui/themes";
import { ArrowUpIcon } from "@radix-ui/react-icons";

// Tiptap
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";

// Styles
import styles from "./RichContentEditor.module.css";

// Types
type RichContentEditorPropsType = {
    savedNotes?: string
};

export default function RichContentEditor({ savedNotes }: RichContentEditorPropsType) {
    const editor = useEditor({
        extensions: [StarterKit, Underline],
        content: savedNotes,
        immediatelyRender: false,
        editorProps: {
            attributes: {
                class: styles["text-area"]
            }
        }
    });

    return (
        // <Flex direction="column" className={styles["editor-container"]}>
        <Flex direction="column">
            {editor && <RichMenuBar editor={editor} />}
            <EditorContent editor={editor} />
            <Flex pt="2" pr="1" justify="end">
                <ActionIconButton
                    version="solid"
                    radius="full"
                    tooltip="Zapisz"
                >
                    <ArrowUpIcon />
                </ActionIconButton>
            </Flex>
        </Flex>
    );
}