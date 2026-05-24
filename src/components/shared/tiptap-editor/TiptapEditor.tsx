"use client";


// Components
import ActionIconButton from "@/components/ui/ActionIconButton";
import TiptapToolbar from "./TiptapToolbar";


// Constants
const initialActionState: UpdateFlowNoteActionStateType | PostReactisTaskCommentActionStateType = {
    ok: false,
    error: null,
    content: null
};


// Context
import { useEditorContext } from "@/features/tasks/context/editor.context";


// Material symbols
import MaterialSymbol from "@/components/ui/MaterialSymbol";


// Radix
import { Flex } from "@radix-ui/themes";


// React.js
import React, {
    useActionState,
    useEffect,
    useRef,
    useState
} from "react";


// Styles
import styles from "./TiptapEditor.module.css";


// Tiptap
import {
    useEditor,
    EditorContent
} from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";


// Types
import type { UpdateFlowNoteActionStateType } from "@/features/tasks/actions/update-flow-note.action";

import type { PostReactisTaskCommentActionStateType } from "@/features/tasks/actions/add-reactis-task-comment.action";


type CommentEditorType = {
    variant: "comment",
    reactisTaskId: string,
    action: (
        prevState: PostReactisTaskCommentActionStateType,
        formData: FormData
    ) => Promise<PostReactisTaskCommentActionStateType>
};

type NoteEditorType = {
    variant: "note",
    reactisTaskId: string,
    action: (
        prevState: UpdateFlowNoteActionStateType,
        formData: FormData
    ) => Promise<UpdateFlowNoteActionStateType>
};

type TiptapEditorPropsType = NoteEditorType | CommentEditorType;


// Main function
export default function TiptapEditor(props: TiptapEditorPropsType) {
    const { variant, reactisTaskId, action } = props;


    const editorAreaRef = useRef<HTMLDivElement | null>(null);
    const hiddenInputRef = useRef<HTMLInputElement | null>(null);


    const [isToolbarOpened, setIsToolbarOpened] = useState<boolean>(false);
    const [isContentLong, setIsContentLong] = useState<boolean>(false);


    const [state, formAction, isPending] = useActionState(action, initialActionState);


    const {
        activeNotes,
        activeComments,
        setFocusActiveContent,
        initActiveContent,
        updateActiveContent,
        commitActiveContent
    } = useEditorContext();


    const activeContent =
        variant === "note"
            ? activeNotes[reactisTaskId]
            : activeComments[reactisTaskId];


    const editor = useEditor({
        extensions: [StarterKit],

        content: activeContent?.currentContent,

        immediatelyRender: false,

        editorProps: {
            attributes: {
                class: styles.editor
            }
        },

        onCreate: ({ editor }) => {
            setIsContentLong(editor.state.doc.childCount > 1);
        },

        onFocus: () => {
            setFocusActiveContent(variant, reactisTaskId, true);
        },

        onUpdate: ({ editor }) => {
            setIsContentLong(editor.state.doc.childCount > 1);
        },

        onBlur: ({ editor, event }) => {
            const relatedTarget = event.relatedTarget as Node | null;

            if (relatedTarget && editorAreaRef.current?.contains(relatedTarget)) {
                return;
            }

            const jsonContent = editor.getJSON();
            updateActiveContent(variant, reactisTaskId, jsonContent);
            setFocusActiveContent(variant, reactisTaskId, false);
            setIsToolbarOpened(false);
        }
    });


    // Set focus when clicked inside the container
    function handleFocus() {
        if (!editor || isPending) {
            return;
        }

        editor.commands.focus();
    }


    // Click outside the editor event listener. If form is pending — return. Else — blur editor.
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (!editor || isPending) {
                return;
            }

            const target = event.target as Node;

            if (!editorAreaRef.current?.contains(target)) {
                editor.commands.blur();
            }
        }

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        }
    }, [editor, isPending]);


    // Toggle toolbar from the editor button.
    function handleToggleToolbar(event: React.MouseEvent<HTMLButtonElement>) {
        if (!editor || isPending) {
            return;
        }

        event.preventDefault();
        event.stopPropagation();

        setIsToolbarOpened(prev => !prev);

        editor.commands.focus();
    }


    // Submit the form and update initial note.
    function handleSubmit() {
        if (!editor || !hiddenInputRef.current) {
            return;
        }

        if (variant === "comment") {
            const htmlContent = editor.getHTML();
            hiddenInputRef.current.value = htmlContent;
        }

        if (variant === "note") {
            const jsonContent = editor.getJSON();
            const stringContent = JSON.stringify(jsonContent);

            hiddenInputRef.current.value = stringContent;
        }
    }


    // If form is sent correctly — update initial content, blur editor, and set it able to be edited.
    useEffect(() => {
        if (!editor) {
            return;
        }

        if (!isPending && state.ok) {
            if (variant === "comment") {
                commitActiveContent(variant, reactisTaskId);
                editor.commands.clearContent();
                editor.commands.blur();
            }

            if (variant === "note") {
                const jsonContent = editor.getJSON();
                commitActiveContent(variant, reactisTaskId, jsonContent);
                editor.commands.blur();
            }

        }

        editor.setEditable(!isPending);
    }, [editor, isPending, state.ok]);


    return (
        <Flex
            className={[
                styles["main-container"],
                styles[`${variant}-editor-container`],
                activeContent?.isFocused && styles.focus
            ].join(" ")}
            direction="column"
            onClick={handleFocus}
            ref={editorAreaRef}
        >
            {editor && (
                <TiptapToolbar
                    editor={editor}
                    isToolbarVisible={activeContent?.isFocused && isToolbarOpened}
                />
            )}


            <form
                action={formAction}
                onSubmit={handleSubmit}
            >
                <input
                    name={variant}
                    type="hidden"
                    ref={hiddenInputRef}
                />


                <Flex
                    className={[
                        styles["input-area"],
                        isContentLong && styles["long-content"]
                    ].join(" ")}
                    gap="2"
                >
                    <EditorContent
                        disabled={isPending}
                        editor={editor}
                        style={{ flexGrow: 1 }}
                    />


                    <Flex
                        className={[
                            styles["action-buttons-container"],
                            variant === "comment" && styles.visible,
                            (variant === "note" && activeContent?.isFocused) && styles.visible,
                            (variant === "note" && !activeContent?.isFocused) && styles.hidden
                        ].join(" ")}
                        gap="1"
                    >
                        <ActionIconButton
                            disabled={isPending}
                            onClick={handleToggleToolbar}
                            radius="full"
                            tooltip="Otwórz opcje formatowania"
                            type="button"
                            version="ghost"
                        >
                            <MaterialSymbol name="text_format" />
                        </ActionIconButton>

                        <ActionIconButton
                            disabled={(isPending)}
                            loading={isPending}
                            radius="full"
                            tooltip={variant === "comment" ? "Wyślij" : "Zapisz"}
                            type="submit"
                            version="solid"
                        >
                            <MaterialSymbol
                                name={variant === "comment" ? "send" : "save_as"}
                            />
                        </ActionIconButton>
                    </Flex>
                </Flex>
            </form>
        </Flex>
    );
}