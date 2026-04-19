"use client";

// React.js
import { createContext, useContext, useMemo, useState } from "react";

// Types
import type { Dispatch, ReactNode, SetStateAction } from "react";

type RichContentEditorContextType = {
    isNoteDirty: boolean,
    onNoteDirtyChange: Dispatch<SetStateAction<boolean>>
    isNoteFocused: boolean,
    onNoteFocusChange: Dispatch<SetStateAction<boolean>>
};

type RichContentEditorProviderPropsType = {
    children: ReactNode
};

// Constants
const RichContentEditorContext = createContext<RichContentEditorContextType | null>(null);

// Functions
export function RichContentEditorProvider({ children }: RichContentEditorProviderPropsType) {
    const [isNoteDirty, setIsNoteDirty] = useState<boolean>(false);
    const [isNoteFocused, setIsNoteFocused] = useState<boolean>(false);

    const value = useMemo(() => ({
        isNoteDirty,
        onNoteDirtyChange: setIsNoteDirty,
        isNoteFocused,
        onNoteFocusChange: setIsNoteFocused
    }), [isNoteDirty, isNoteFocused]);

    return (
        <RichContentEditorContext.Provider value={value}>
            {children}
        </RichContentEditorContext.Provider>
    );
}

export function useRichContentEditorContext() {
    const context = useContext(RichContentEditorContext);

    if (!context) throw new Error("useRichContentEditorContext must be used within RichContentEditorProvider");

    return context;
}