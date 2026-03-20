// Components
import PanelHeader from "@/components/layout/panel/PanelHeader";

// Types
import { ReactNode } from "react";

type PanelLayoutPropsType = {
    children: ReactNode;
}

export default function PanelLayout({ children }: PanelLayoutPropsType) {
    return (
        <>
            <PanelHeader />
            {children}
        </>
    );
}