"use client";


// Constants
import { EMPTY_TIPTAP_DOC } from "@/components/shared/tiptap-editor/empty-tiptap-doc-fallback";


// React.js
import {
    createContext,
    useContext,
    useMemo,
    useState
} from "react";


// Types
import type { ReactNode } from "react";

import type { JSONContent } from "@tiptap/react";


type ContentVariantType = "note" | "comment";


type ActiveContentType = {
    initialContent: JSONContent,
    currentContent: JSONContent,
    isFocused: boolean,
    isDirty: boolean
};


type EditorContextType = {
    activeComments: Record<string, ActiveContentType>,
    activeNotes: Record<string, ActiveContentType>,
    initActiveContent: (variant: ContentVariantType, taskId: string, content?: JSONContent) => void,
    setFocusActiveContent: (variant: ContentVariantType, taskId: string, isFocused: boolean) => void
    updateActiveContent: (variant: ContentVariantType, taskId: string, content: JSONContent) => void,
    commitActiveContent: (variant: ContentVariantType, taskId: string, content?: JSONContent) => void,
    removeActiveContent: (variant: ContentVariantType, taskId: string) => void,
};


type EditorProviderPropsType = {
    children: ReactNode;
};


// Context
const EditorContext = createContext<EditorContextType | null>(null);


// Provider
export function EditorProvider({ children }: EditorProviderPropsType) {
    const [activeComments, setActiveComments] = useState<Record<string, ActiveContentType>>({});
    const [activeNotes, setActiveNotes] = useState<Record<string, ActiveContentType>>({});


    function initActiveContent(
        variant: ContentVariantType,
        taskId: string,
        content: JSONContent = EMPTY_TIPTAP_DOC
    ) {
        const setActiveContent = variant === "comment" ? setActiveComments : setActiveNotes;

        setActiveContent(prev => {
            if (prev[taskId]) {
                return prev;
            }

            return {
                ...prev,
                [taskId]: {
                    initialContent: content,
                    isFocused: false,
                    currentContent: content,
                    isDirty: false
                }
            };
        });
    }


    function setFocusActiveContent(
        variant: ContentVariantType,
        taskId: string,
        isFocused: boolean
    ) {
        const setActiveContent = variant === "comment" ? setActiveComments : setActiveNotes;

        setActiveContent(prev => ({
            ...prev,
            [taskId]: {
                ...prev[taskId],
                isFocused
            }
        }));
    }


    function updateActiveContent(
        variant: ContentVariantType,
        taskId: string,
        content: JSONContent
    ) {
        const setActiveContent = variant === "comment" ? setActiveComments : setActiveNotes;

        setActiveContent(prev => ({
            ...prev,
            [taskId]: {
                ...prev[taskId],
                currentContent: content,
                isDirty: JSON.stringify(prev[taskId]?.initialContent) !== JSON.stringify(content)
            }
        }));
    }


    function commitActiveContent(
        variant: ContentVariantType,
        taskId: string,
        content: JSONContent = EMPTY_TIPTAP_DOC
    ) {
        const setActiveContent = variant === "comment" ? setActiveComments : setActiveNotes;

        setActiveContent(prev => {
            return {
                ...prev,
                [taskId]: {
                    initialContent: content,
                    isFocused: false,
                    currentContent: content,
                    isDirty: false
                }
            };
        });
    }


    function removeActiveContent(variant: ContentVariantType, taskId: string) {
        const setActiveContent = variant === "comment" ? setActiveComments : setActiveNotes;

        setActiveContent(prev => {
            const next = { ...prev };
            delete next[taskId];
            return next;
        });
    }


    const value = useMemo<EditorContextType>(() => ({
        activeComments,
        activeNotes,
        initActiveContent,
        setFocusActiveContent,
        updateActiveContent,
        commitActiveContent,
        removeActiveContent
    }), [activeComments, activeNotes]);


    return (
        <EditorContext.Provider value={value}>
            {children}
        </EditorContext.Provider>
    );
}


// Use context
export function useEditorContext() {
    const ctx = useContext(EditorContext);

    if (!ctx) throw new Error("useEditorContext must be used within EditorContextProvider");

    return ctx;
}