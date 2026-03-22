// Repo
import { getReactisUserData } from "@/features/auth/repo/auth.repo";

// Components
import PanelHeader from "@/components/layout/panel/PanelHeader";

// Types
import { ReactNode } from "react";
import { ReactisUserDataType } from "@/types/reactis";

type PanelLayoutPropsType = {
    children: ReactNode;
}

// Constants
const fallbackReactisUserData: ReactisUserDataType = {
    name: "Nowy",
    surname: "Użytkownik",
    group: "Brak danych",
    email: "E-mail",
    id: "ID"
};

export default async function PanelLayout({ children }: PanelLayoutPropsType) {
    const response = await getReactisUserData();

    const reactisUserData = response.ok ? response.data : fallbackReactisUserData;
    console.log(reactisUserData);

    return (
        <>
            <PanelHeader reactisUserData={reactisUserData} />
            {children}
        </>
    );
}