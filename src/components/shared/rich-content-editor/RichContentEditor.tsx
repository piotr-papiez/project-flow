"use client";

// React.js
import { SetStateAction, useActionState, useEffect, useRef, useState } from "react";

// Components
import RichMenuBar from "./RichMenuBar";
import ActionIconButton from "@/components/ui/ActionIconButton";

// Radix
import { Flex } from "@radix-ui/themes";

// Material Symbol
import MaterialSymbol from "@/components/ui/MaterialSymbol";

// Tiptap
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";

// Styles
import styles from "./RichContentEditor.module.css";

// Types
import type { Dispatch } from "react";
import type { JSONContent } from "@tiptap/react";

import type { UpdateFlowNoteActionStateType } from "@/features/tasks/actions/update-flow-note.action";
import type { PostReactisTaskCommentActionStateType } from "@/features/tasks/actions/add-reactis-task-comment.action";

type ContentContextType = {
    onDirtyChange: Dispatch<SetStateAction<boolean>>,
    isFocused: boolean,
    onFocusChange: Dispatch<SetStateAction<boolean>>
};

type NoteEditorType = {
    version: "note",
    savedNote?: JSONContent,
    reactisTaskId: string,
    context: ContentContextType,
    action: (
        prevState: UpdateFlowNoteActionStateType,
        formData: FormData
    ) => Promise<UpdateFlowNoteActionStateType>;
};

type CommentEditorType = {
    version: "comment",
    reactisTaskId: string,
    reactisUserId: string,
    context: ContentContextType,
    action: (
        prevState: PostReactisTaskCommentActionStateType,
        formData: FormData
    ) => Promise<PostReactisTaskCommentActionStateType>;
};

type RichContentEditorPropsType = NoteEditorType | CommentEditorType;

// Constants
const initialState: UpdateFlowNoteActionStateType | PostReactisTaskCommentActionStateType = {
    ok: false,
    error: null,
    content: null
};

export default function RichContentEditor(props: RichContentEditorPropsType) {
    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const isContentLoaded = useRef<boolean>(false);
    const hiddenInputRef = useRef<HTMLInputElement | null>(null);

    const [isToolbarOpen, setIsToolbarOpen] = useState(false);
    const [isLongContent, setIsLongContent] = useState(false);

    const [state, formAction, isPending] = useActionState(props.action, initialState);

    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Placeholder.configure({
                placeholder: "Napisz notatkę…",
                showOnlyWhenEditable: true,
                showOnlyCurrent: false
            })
        ],

        content: props.version === "note" ? props.savedNote : "",
        immediatelyRender: false,

        onUpdate: ({ editor }) => {
            if (!isContentLoaded.current) {
                isContentLoaded.current = true;
                return;
            }

            props.context.onDirtyChange(true);

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
                props.context.onFocusChange(false);
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
            props.context.onFocusChange(false);
            setIsToolbarOpen(false);
            props.context.onDirtyChange(false);
            editor.commands.blur();

            if (props.version === "comment") {
                editor.commands.clearContent();
            }
        }
    }, [editor, isPending, state.ok]);

    const showToolbar = props.context.isFocused && isToolbarOpen;

    function handleFocus() {
        if (isPending) return;

        props.context.onFocusChange(true);
        editor?.commands.focus();
    }

    function handleToggleToolbar(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        event.stopPropagation();

        if (isPending) return;

        props.context.onFocusChange(true);
        setIsToolbarOpen(prev => !prev);
        editor?.commands.focus();
    }

    function handleSubmit() {
        if (!editor || !hiddenInputRef.current) return;

        if (props.version === "comment") {
            hiddenInputRef.current.value = editor.getHTML();
        }

        if (props.version === "note") {
            hiddenInputRef.current.value = JSON.stringify(editor.getJSON());
        }
    }

    return (
        <Flex
            direction="column"
            onClick={handleFocus}
            ref={wrapperRef}
            className={[
                styles["main-container"],
                styles[`${props.version}-editor-container`],
                props.context.isFocused && styles.focus
            ].join(" ")}
        >
            {editor && <RichMenuBar
                editor={editor}
                showToolbar={showToolbar}

            />}

            <form action={formAction} onSubmit={handleSubmit}>
                <input ref={hiddenInputRef} type="hidden" name={props.version} />

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
                            props.version === "comment" && styles.visible,
                            (props.version === "note" && props.context.isFocused) && styles.visible,
                            (props.version === "note" && !props.context.isFocused) && styles.hidden
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
                            <MaterialSymbol name="text_format" />
                        </ActionIconButton>

                        <ActionIconButton
                            type="submit"
                            version="solid"
                            radius="full"
                            tooltip={props.version === "note" ? "Zapisz" : "Wyślij"}
                            loading={isPending}
                            disabled={isPending}
                        >
                            <MaterialSymbol name={props.version === "comment" ? "send" : "save_as"} />
                        </ActionIconButton>
                    </Flex>
                </Flex>
            </form>
        </Flex>
    );
}