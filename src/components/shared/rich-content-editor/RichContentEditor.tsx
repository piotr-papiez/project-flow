"use client";

// React.js
import { useActionState, useEffect, useRef, useState } from "react";

// Components
import RichMenuBar from "./RichMenuBar";
import ActionIconButton from "@/components/ui/ActionIconButton";

// Radix
import { Flex } from "@radix-ui/themes";
import { PaperPlaneIcon, LetterCaseCapitalizeIcon } from "@radix-ui/react-icons";

// Tiptap
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";

// Actions
import { updateFlowNote } from "@/features/tasks/actions/update-flow-note.action";

// Styles
import styles from "./RichContentEditor.module.css";

// Types
type RichContentEditorPropsType = {
    savedNotes?: string,
    reactisTaskId?: string
};

import type { UpdateFlowNoteActionStateType } from "@/features/tasks/actions/update-flow-note.action";

// Constants
const initialState: UpdateFlowNoteActionStateType = {
    ok: false,
    error: null,
    updatedNote: null
};

export default function RichContentEditor({
    savedNotes, reactisTaskId = ""
}: RichContentEditorPropsType) {
    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const hiddenInputRef = useRef<HTMLInputElement | null>(null);

    const [isActive, setIsActive] = useState(false);
    const [isToolbarOpen, setIsToolbarOpen] = useState(false);
    const [isLongContent, setIsLongContent] = useState(false);

    const actionWithTaskId = updateFlowNote.bind(null, reactisTaskId);
    const [state, formAction, isPending] = useActionState(actionWithTaskId, initialState);

    const editor = useEditor({
        extensions: [StarterKit, Underline],
        content: savedNotes ?? "",
        immediatelyRender: false,

        onUpdate: ({ editor }) => {
            const longContent = editor.state.doc.childCount > 1;
            setIsLongContent(longContent);
        },

        editorProps: {
            attributes: {
                class: styles.editor
            }
        }
    });

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (isPending) return;

            const target = event.target as Node;

            if (!wrapperRef.current?.contains(target)) {
                setIsActive(false);
                setIsToolbarOpen(false);
                editor?.commands.blur();
            }
        }

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [editor, isPending]);

    useEffect(() => {
        if (!editor) return;
        editor.setEditable(!isPending);

        if (state.ok && !isPending) {
            setIsActive(false);
            setIsToolbarOpen(false);
            editor.commands.blur();
        }
    }, [editor, isPending, state.ok]);

    const showToolbar = isActive && isToolbarOpen;

    function handleFocus() {
        if (isPending) return;

        setIsActive(true);
        editor?.commands.focus();
    }

    function handleToggleToolbar(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        event.stopPropagation();

        if (isPending) return;

        setIsActive(true);
        setIsToolbarOpen(prev => !prev);
        editor?.commands.focus();
    }

    function handleSubmit() {
        if (!editor || !hiddenInputRef.current) return;

        hiddenInputRef.current.value = editor.getHTML();
    }

    return (
        <Flex
            direction="column"
            onClick={handleFocus}
            ref={wrapperRef}
            className={[
                styles["main-container"],
                isActive && styles.focus
            ].join(" ")}
        >
            {editor && <RichMenuBar
                editor={editor}
                showToolbar={showToolbar}

            />}

            <form action={formAction} onSubmit={handleSubmit}>
                <input ref={hiddenInputRef} type="hidden" name="note" />

                <Flex
                    gap="2"
                    className={[
                        styles["input-area"],
                        isLongContent && styles["long-content"]
                    ].join(" ")}
                >

                    <EditorContent
                        editor={editor}
                        disabled={isPending}
                        style={{ flexGrow: 1 }}
                    />

                    <Flex
                        gap="1"
                        className={[
                            styles["action-buttons-container"],
                            isActive ? styles.visible : styles.hidden
                        ].join(" ")}
                    >
                        <ActionIconButton
                            type="button"
                            onClick={handleToggleToolbar}
                            version="ghost"
                            radius="full"
                            tooltip="Otwórz opcje formatowania"
                            disabled={isPending}
                        >
                            <LetterCaseCapitalizeIcon />
                        </ActionIconButton>

                        <ActionIconButton
                            type="submit"
                            version="solid"
                            radius="full"
                            tooltip="Zapisz"
                            loading={isPending}
                            disabled={isPending}
                        >
                            <PaperPlaneIcon />
                        </ActionIconButton>
                    </Flex>
                </Flex>
            </form>
        </Flex>
    );
}