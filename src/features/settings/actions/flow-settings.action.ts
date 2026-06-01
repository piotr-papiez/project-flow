"use server";


// Services
import { getFlowUserId } from "@/features/auth/services/auth.service";
import { upsertReactisSettings } from "../services/reactis-settings.service";


// Libs
import { setReactisUserIdCookie } from "@/features/auth/lib/reactis-user-id-cookie";


// Types
import type {
    ReactisFormErrorsStateType,
    SaveReactisSettingsStateType
} from "@/types/reactis";


export async function saveReactisSettings(prevState: SaveReactisSettingsStateType, formData: FormData): Promise<SaveReactisSettingsStateType> {
    const formErrors: ReactisFormErrorsStateType = {};


    const flowUserId = await getFlowUserId();
    if (!flowUserId) return {
        ok: false,
        formErrors: {
            flowUserId: "Nie znaleziono ID użytkownika Dayglow"
        }
    }


    const reactisUserEmail = formData.get("reactis-user-email") as string;
    const reactisUserId = formData.get("reactis-user-id") as string;
    const reactisApiKey = formData.get("reactis-api-key") as string;


    if (!reactisUserEmail.trim()) {
        formErrors.reactisUserEmail = "Wpisz adres e-mail";
    }

    if (!reactisUserId.trim()) {
        formErrors.reactisUserId = "Wpisz ID użytkownika";
    }


    if (Object.keys(formErrors).length > 0) {
        return {
            ok: false,
            formErrors
        };
    }


    const upsertedSettings = await upsertReactisSettings({
        flowUserId,
        reactisUserEmail,
        reactisUserId,
        reactisApiKey
    });

    if (!upsertedSettings.ok) {
        if (upsertedSettings.message === "MISSING_EMAIL") return {
            ok: false,
            formErrors: {
                reactisUserEmail: "Wpisz adres e-mail"
            }
        }

        if (upsertedSettings.message === "MISSING_ID") return {
            ok: false,
            formErrors: {
                reactisUserEmail: "Wpisz ID użytkownika"
            }
        }

        if (upsertedSettings.message === "API_KEY_NOT_FOUND") return {
            ok: false,
            formErrors: {
                reactisApiKey: "Wprowadź klucz API"
            }
        }


        if (upsertedSettings.message === "UNAUTHORIZED") return {
            ok: false,
            formErrors: {
                other: "Niepoprawne dane integracji"
            }
        }

        return {
            ok: false
        }
    }


    const upsertedReactisUserId = upsertedSettings.data.reactisUserId ?? "";


    await setReactisUserIdCookie(upsertedReactisUserId);


    return {
        ok: true
    };
}